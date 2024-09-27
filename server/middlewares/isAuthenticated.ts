import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {


    try {
        console.log("Request Cookies:", req.cookies); 
        const token = req.cookies.token;
        console.log("Token from cookies:", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User Not Authenticated"
            })
        }
        // verify the token
        // const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        console.log("Decoded Token:", decode);
             
        if (!process.env.SECRET_KEY) {
            return res.status(500).json({
                message: "Internal Server Error: SECRET_KEY not set"
            });
        }
        
        //CHECK IS DECODING WAS SUCCESSFULL
        if (!decode || !decode.userID) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
        req.id = decode.userID;
        console.log("User ID set in request:", req.id);
        next();

    } catch (error) {
        console.error("Authentication error:", error instanceof Error ? error.message : error);

        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}