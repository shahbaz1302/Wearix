import { Router } from "express";
import { loginUser,registerUser,adminLogin, verifyEmail, logoutUser, forgotPassword, resetPassword, checkAuth, resendVerification, editUser, changePassword, setPassword, deleteAccount } from "../controllers/user.controller.js"
import { authUser } from "../middleware/auth.js";

const userRouter=Router()

userRouter.get("/check-auth",authUser,checkAuth)
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.put("/edit-profile",authUser,editUser)
userRouter.put("/change-password",authUser,changePassword)
userRouter.put("/set-password",authUser,setPassword)
userRouter.post("/admin",adminLogin)
userRouter.post("/logout",logoutUser)
userRouter.delete("/delete-account", authUser, deleteAccount);

userRouter.post("/verify-email",verifyEmail)
userRouter.post("/resend-verification",resendVerification)
userRouter.post("/forgot-password",forgotPassword)
userRouter.post("/reset-password/:token",resetPassword)

export default userRouter