import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ip: String,
    userAgent: String,
    isValid: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

const sessionModel = mongoose.models.session || mongoose.model("session", sessionSchema);

export default sessionModel;