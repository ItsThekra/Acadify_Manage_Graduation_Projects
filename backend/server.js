import express from 'express'; 
import { connectDB } from './db/connecdb.js';
import authRouter from './routes/auth.route.js';

const app = express();

// get in express = to retrieve data
app.get('/' , (req, res) =>{
    res.send('Hello World');
})

app.use('/api/auth', authRouter) // Diff something need to work on it 
// هذا الاساس

app.listen(3000,  () => {
    connectDB();
    console.log('Server is running on port 3000');
    
})
