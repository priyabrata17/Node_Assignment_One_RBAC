const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const generateTokens = require("../helper/generateTokens");
const tokenModel = require("../model/tokenModel");

class UserController {
  //Signup
  async signup(req, res) {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "all fields are required!" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password and confirm-password should be same!" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();

    const resData = await userModel.findOne({ email }, { password: 0 });

    return res.status(201).json({
      message: "user created successfully",
      data: resData,
    });
  }

  //Login
  async login(req, res) {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "all fields are required!",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "no user found!",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "password is not matched!",
      });
    }

    const { refreshToken, accessToken, rememberMeFlag } = await generateTokens(
      existingUser,
      rememberMe
    );

    const accessTokenMaxAge = rememberMeFlag ? 15 * 60 * 1000 : undefined;
    const refreshTokenMaxAge = rememberMeFlag
      ? 30 * 24 * 60 * 60 * 1000
      : undefined;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: accessTokenMaxAge,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenMaxAge,
    });

    return res.status(200).json({
      message: "user logged in successfully",
    });
  }

  //logout
  async logout(req, res) {
    const {refreshToken} = req.cookies;

    await tokenModel.findOneAndDelete({token: refreshToken});
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: `logged out successfully`
    });
  }

  //all user
  async allUser(req, res) {
    const allUser = await userModel.find({},{password: 0, __v: 0});
    return res.status(200).json({
      message: `data fetch successfully`,
      length: allUser.length,
      data: allUser
    });
  }
}

module.exports = new UserController();
