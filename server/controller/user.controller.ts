import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs"
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateTokens";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email";
import { any, string } from "zod";


export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password, contact } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"  // Error for existing user
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken =  generateVerificationCode();


        // create new
        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
        generateToken(res, user);

        await sendVerificationEmail(email, verificationToken);

        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrct email"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrct password"
            });
        }

        generateToken(res, user)

        user.lastLogin = new Date();
        await user.save();

        //send user without pasword
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const verifyEmail = async (req: Request, res: Response) => {

    try {
        console.log("Request received"); 
        console.log("Request Body:", req.body); // Log the request body
        console.log("Current Time:", Date.now()); // Log the current timestamp
        const { verificationCode  } = req.body;
        console.log(verificationCode);
        console.log("Verification Code:", verificationCode);
        // const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpireAt: { $gt: Date.now() } }).select("-password");
        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() }  // Check the field name here
        }).select("-password");
        
        console.log("User Query:", { verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } });
        console.log("User Found:", user);  // Log if the user was found
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired verification token"
            })
        }
        user.isVerified = true;
        user.verificationToken  = undefined;
        user.verificationTokenExpiresAt = undefined; // Correct the typo here

        await user.save();  //to save latest data


        //send welcome email
        await sendWelcomeEmail(user.email ?? '', user.fullname ?? 'User');


        return res.status(200).json({
            success: true,
            message: "Email verified Successfully",
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })

    }
}

export const logout = async (_: Request, res: Response) => {

    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged Out Successfully"
        });
    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Internal server error" })

    }

};

// export const forgetPassword = async (req: Request, res: Response) => {

//     try {

//         const { email } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User Dosent Exist"
//             })
//         };
//         const resetToken = crypto.randomBytes(40).toString('hex');
//         const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
//         await user.save();

//         //send Email
//         await sendPasswordResetEmail(user.email,`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);

//         return res.status(200).json({
//             success: true,
//             message: "Password Reset Link Sent To Your Email"
//         });
//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({ message: "Internal server error" })

//     }
// };


export const forgetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email }) //as { email: string, resetPasswordToken?: string, resetPasswordTokenExpiresAt?: Date }; // Cast user to appropriate type
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exist"
            });
        }

        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // Token expires in 1 hour
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();

        // Send Email
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);

        return res.status(200).json({
            success: true,
            message: "Password Reset Link Sent To Your Email"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req: Request, res: Response) => {

    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired reset token"
            });
        }
        //  updated password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined; 
        await user.save();

        // esnd success reset email
        await sendResetSuccessEmail(user.email);

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })

    }


}

//CHECK THE USER IS AUTHENTICATE OR NOT

export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = req.id; // accessing `id` from `Request`, not `Response`
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Dound"
            });
        };
        return res.status(200).json({
            success: true,
            user
        });
        // Do something with userId
        // console.log("Authenticated User ID:", userId);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.id; // Correct the variable name here
        const { fullname, email, address, city, state, profilePicture } = req.body;

        // Upload image on cloudinary
        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);

        // Correct the variable name to updateData
        const updateData = { fullname, email, address, city, state, profilePicture: cloudResponse.secure_url };

        // Correct the variable name to userId and updateData
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            user,
            message: "Profile Updated Successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
