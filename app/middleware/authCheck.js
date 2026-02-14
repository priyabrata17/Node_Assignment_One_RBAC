const jwt = require("jsonwebtoken");
const tokenModel = require("../model/tokenModel");

const authCheck = async (req, res, next) => {
  try {
    let accessToken = req?.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        message: "no token found! please login to continue",
      });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req?.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          message: "session expired, please login again!",
        });
      }

      try {
        let decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        const existingToken = await tokenModel.findOne({ token: refreshToken });
        if (!existingToken) {
          return res.status(401).json({
            message: "no token found, please login!",
          });
        }
        let payload = {
          _id: decodedToken._id,
          email: decodedToken.email,
          role: decodedToken.role,
        };

        const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "15m",
        });

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
        });
        return next();
      } catch (error) {
        return res.status(401).json({
            message: "session expired, please login again"
        });
      }
    }
    return res.status(403).json({
        message: "unauthorized access, please login again."
    });
  }
};

module.exports = authCheck;