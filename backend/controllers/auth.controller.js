
// import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

// Signup controller:
export const signup = async(req, res) => {
    const { name, email, password} = req.body // need parsing middleware in server file, now we can take the data from user

    try {
        // validate the data
        if(!name || !email || !password){
            throw new Error ("All fields are required");
        }
        // check if user already exists
        const existingUser =  await User.findOne({email})       
        if(existingUser){
            throw new Error("User already exists");
        }

        // hash the password: the 10 is the salt rounds, that means how many times the hashing algorithm will be applied to the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // generate a verification token
        const verificationToken = generateVerificationToken();
        
        // create a new user in the database
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpires: Date.now() + 3600000, // 1 hour from now and then will expire
        })

        // save the user to the database
         await user.save()


        // jwt token to authenticate the user
         generateTokenAndSetCookie(res, user._id);

         // return message + the user 
         res
         .status(201)
         .json({
            success: true,
            message: "User created successfully. Please verify your email to activate your account.",
            user:{
                ...user._doc, // to get all the user data except the password
                password: undefined, // to hide the password
            }
        });

    }catch(error){
        res.status(500).json({message: error.message})
    }
};


// ------------ login and logout controllers ------------
export const login = (req, res) => {

};

export const logout = (req, res) => {

};



