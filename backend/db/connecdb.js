import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// dotenv.config({ path: './backend/.env' });

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Database connected...");
    } catch (error) {
        console.error("Database connection failed", error.message);
    }
};