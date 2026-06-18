import sessionModel from "../models/sessionModel.js";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../services/user.services.js";

export const authUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const session = await sessionModel.findById(decoded.sessionId);

        if (!session || !session.isValid) {
          return res.status(401).json({ success: false, message: "Session expired" });
        }

        req.userId = decoded.userId;
        req.sessionId = decoded.sessionId;
        return next();
      } catch (err) {
      }
    }

    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const session = await sessionModel.findById(decodedRefresh.sessionId);

    if (!session || !session.isValid) {
      return res.status(401).json({ success: false, message: "Session expired" });
    }

    const newAccessToken = createAccessToken(session.userId, session.id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    req.userId = session.userId;
    req.sessionId = session.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};