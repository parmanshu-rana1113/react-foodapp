import mongoose, { Document } from "mongoose";
import { boolean, string } from "zod";
// import { boolean, number, string } from "zod";

// TYPESCRIPT
export interface IUser {

    fullname?: string | null;
    email:string;
    password:string;
    contact:number;
    address:string;
    city:string;
    state:string;
    profilePicture:string;
    admin:boolean;
    lastLogin?:Date,
    isVerified?:boolean;
    resetPasswordToken?:string;
    resetPasswordTokenExpiresAt?:Date;
    verificationToken:string;
    verificationTokenExpiresAt?:Date;
    // createdAt:Date;
    // updateAt:Date;

}

export interface IUserDocument extends IUser,Document {
   createdAt:Date;
   updatedAt:Date;

}


const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,  // Missing this earlier
        unique: true,    // Ensure email is unique
    },
    password: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    address: {
        type: String,
        default: "Update your address"
    },
    city: {
        type: String,
        default: "Update your address"
    },
    state: {
        type: String,
        default: "Update your address"
    },
    profilePicture: {
        type: String,
        default: "Update your address"
    },

    admin: { type: Boolean, default: false },

    // advacned authentication 
    lastLogin: {
        type: Date,
        default: "",
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);