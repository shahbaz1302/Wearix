import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    image: { type: String, default: "" },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    hasPassword: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    cartData: { type: Object, default: {} },
    wishList: { type: Object, default: {} },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { minimize: false, timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;