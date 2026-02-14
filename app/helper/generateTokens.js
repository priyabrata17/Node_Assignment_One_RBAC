
const jwt = require("jsonwebtoken");
const tokenModel = require("../model/tokenModel");

const generateTokens = async (user, rememberMe) => {
  try {
    let payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const rememberMeFlag = ["on", "yes", "1", "true"].includes(
      String(rememberMe).toLowerCase()
    );

    let refreshTokenExpiry = rememberMeFlag ? "30d" : "24h";
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: refreshTokenExpiry,
    });

    await tokenModel.findOneAndUpdate(
      { userId: user._id },
      { token: refreshToken, rememberMe: rememberMeFlag },
      { upsert: true, new: true }
    );
    return { refreshToken, accessToken, rememberMeFlag };
  } catch (error) {
    console.log("Token generation failed:", error.message);
    throw new Error(error.message);
  }
};


module.exports = generateTokens;