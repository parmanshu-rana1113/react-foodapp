import jwt from "jsonwebtoken";

import { IUser, IUserDocument } from "../models/user.model";
import { Response } from "express";
export const generateToken = (res:Response, user:IUserDocument) =>{
    const token = jwt.sign({userID:user._id}, process.env.SECRET_KEY!,{expiresIn:'1d'});
    res.cookie("token",token, {httpOnly:true, sameSite:'strict',maxAge:24*60*60*1000});
    return token;
}