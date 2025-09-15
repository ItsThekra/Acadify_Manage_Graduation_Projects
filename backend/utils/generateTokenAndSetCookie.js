import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateTokenAndSetCookie = (res, userID) => {

    // Sign in JWT ({payload}, secret, options)
    const token = jwt.sign({userID}, 
    process.env.JWT_SECRET, 
    {expiresIn: '7d'}
);

// Cookie('name', 'value' , options
res.cookie('token', token, {
    httpOnly: true, // cannot be accessed by javascript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
})

    return token;
}
