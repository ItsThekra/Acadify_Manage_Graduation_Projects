import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";


dotenv.config();

export const connectDB = async () => {
    try {
        console.log("MONGO_URL:", process.env.mongodb_url);
        // await mongoose.connect(process.env.MONGODB_URI);

        console.log("Before");
        const connect = await mongoose.connect(process.env.mongodb_url);
        console.log("After");
        console.log("Database connected", mongoose.connection.hostname);
    }catch(error)
    {
        console.log("Database connection failed", error);
    }
}


