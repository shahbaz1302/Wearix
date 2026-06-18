import userModel from "../models/userModel.js"
import validator from "validator"
import argon2 from "argon2"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail } from "../lib/emails.js"
import orderModel from "../models/orderModel.js"
import { authenticateUser, validatePasswordStrength } from "../services/user.services.js"
import sessionModel from "../models/sessionModel.js"

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exists" })
        }
        if (!user.password) {
            return res.status(400).json({
                success: false,
                message: "This account was created with Google. Please set a password first.",
            });
        }
        const isMatch = await argon2.verify(user.password, password)
        if (isMatch) {
            await authenticateUser(req, res, user)
            user.lastLogin = new Date()
            await user.save()
            res.status(200).json({ success: true, message: "Login Successful" })
        }
        else {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        const { isValid, checks } = validatePasswordStrength(password);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character",
                checks,
            });
        }
        const hashedPassword = await argon2.hash(password)
        const newUser = new userModel({
            name, email, password: hashedPassword, hasPassword: true
        })
        const user = await newUser.save()
        await authenticateUser(req, res, user)
        res.status(201).json({ success: true, message: "Registration Successful" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.status(200).json({ success: true, token })
        }
        else {
            res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.accessToken
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                await sessionModel.findByIdAndUpdate(decoded.sessionId, {
                    isValid: false,
                });
            } catch (error) {
                res.status(500).json({ success: false, message: error.message, });
            }
        }
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        });
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await userModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        res.status(200).json({ success: true, message: "Email Verified Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ success: false, message: "User not found" })
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt
        await user.save()
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`)
        res.status(200).json({ success: true, message: "Password reset link sent to your email" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired reset token" })
        const hashedPassword = await argon2.hash(password)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()
        await sendResetSuccessEmail(user.email)
        res.status(200).json({ success: true, message: "Password reset successful" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const resendVerification = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User not found" });
        if (user.isVerified) return res.status(400).json({ success: false, message: "Email already verified" });

        // Generate new token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationToken = verificationToken;
        user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        await sendVerificationEmail(user.email, verificationToken);
        res.status(200).json({ success: true, message: "Verification email sent" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const editUser = async (req, res) => {
    try {
        const { name } = req.body;

        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        user.name = name.trim();
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const isMatch = await argon2.verify(user.password, currentPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "New password and confirm password do not match" });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ success: false, message: "New password must be different from current password" });
        }

        const { isValid } = validatePasswordStrength(newPassword);
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
            });
        }

        const hashedPassword = await argon2.hash(newPassword);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const setPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const userId = req.userId;

        if (!password || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const { isValid, checks } = validatePasswordStrength(password);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character",
                checks,
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.password) {
            return res.status(400).json({ success: false, message: "Password already set" });
        }

        const hashedPassword = await argon2.hash(password);

        user.password = hashedPassword;
        user.hasPassword = true;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password set successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await sessionModel.deleteMany({userId})
        await orderModel.deleteMany({ userId });
        await userModel.findByIdAndDelete(userId);

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        });
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.log("Delete account error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};