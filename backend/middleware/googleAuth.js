import userModel from "../models/userModel.js";
import { authenticateUser } from "../services/user.services.js";

export const googleAuth = async (req, res, next) => {
  try {
    const googleEmail = req.user?._json?.email;
    const googleName = req.user?._json?.name;
    const googlePicture = req.user?._json?.picture;

    let user = await userModel.findOne({ email: googleEmail });

    if (!user) {
      user = await userModel.create({
        name: googleName,
        email: googleEmail,
        image: googlePicture || "",
        isVerified: true,
        authProvider: "google",
        hasPassword: false,
        password: "",
        lastLogin: Date.now(),
      });
    } else {
      user.name = googleName || user.name;
      user.image = googlePicture || user.image;
      user.isVerified = true;
      user.lastLogin = Date.now();

      if (!user.authProvider) user.authProvider = "google";
      if (!user.password) user.hasPassword = false;

      await user.save();
    }

    await authenticateUser(req, res, user)
    next();
  } catch (error) {
    next(error);
  }
};