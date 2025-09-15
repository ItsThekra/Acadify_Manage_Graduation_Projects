import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    lastLogin:{
        type: Date,
        default: Date.now,
    },
    isverified:{
        type: Boolean,
        default: false,
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    verificationToken:String,
    vserificationTokenExpires:Date
}, {timestamps: true});


export const User = mongoose.model('user' , userSchema);

