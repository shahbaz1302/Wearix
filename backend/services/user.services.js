import jwt from "jsonwebtoken"
import sessionModel from "../models/sessionModel.js";

export const createSession = async (userId, { ip, userAgent, isValid }) => {
    const session = await sessionModel.create({
        userId,
        ip,
        userAgent,
        isValid,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });
    return session;
};

export const createAccessToken = (userId, sessionId) => {
    return jwt.sign({ userId, sessionId }, process.env.JWT_SECRET, {
        expiresIn: "15m"
    })
}

export const createRefreshToken = (sessionId) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export const validatePasswordStrength = (password) => {
    const checks = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };

    const isValid = Object.values(checks).every(Boolean);

    return { isValid, checks };
};

export const authenticateUser = async (req, res, user) => {
    const session = await createSession(user._id, {
        ip: req.clientIp,
        userAgent: req.headers["user-agent"],
        isValid: true
    })

    const accessToken = createAccessToken(user._id, session._id);

    const refreshToken = createRefreshToken(session._id);

    const baseConfig = { httpOnly: true, secure: true, sameSite: "none" };
    res.cookie("accessToken", accessToken, { ...baseConfig, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { ...baseConfig, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET
        );

        const session =
            await sessionModel.findById(
                decoded.sessionId
            );

        if (
            !session ||
            !session.isValid
        ) {
            return res.status(401).json({
                success: false
            });
        }

        const accessToken =
            createAccessToken({
                userId: session.userId,
                sessionId: session._id
            });

        res.cookie(
            "accessToken",
            accessToken,
            {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000
            }
        );

        return res.json({
            success: true
        });

    } catch (error) {

        return res.status(401).json({
            success: false
        });
    }
};