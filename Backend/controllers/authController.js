const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authenticator = require('otplib');
const bcrypt = require('bcryptjs');
const admin = require("../models/adminModel");
//const qrcode = require('qrcode');
//const crypto = require('crypto');

const authController = {
 loginUser:  async (req, res) => {
  try {
    const { email, password,code } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    // Find the user by email
    const user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // const salt = user.Salt;
    // const hash = await bcrypt.hash(password, salt);
    const isPasswordValid = await  bcrypt.compare(password, user.Passsword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.MFA_Enabled) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            UserId: user._id,
            Username: user.Username,
            RoleID: user.RoleID,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" } //make it 15 min after deployement it's 10s for testing purposes
      );
      //create secure cookie with refresh token
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        //secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Logged in " });
    }

    const verified = await authenticator.check(code, user.secret);
    if (!verified) {
      return res.status(401).json({ message: "Invalid Code" });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          Username: user.Username,
          RoleID: user.RoleID,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    //create secure cookie with refresh token
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Logged in " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
 refresh: async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const foundUser = await User.findOne({ Username: decoded.Username });
    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId : foundUser._id,
          RoleID: foundUser.RoleID,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } //make it 15 min after deployement it's 10s for testing purposes
    );

    return res.status(200).json({ accessToken });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  }
},
 logout:  async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  return res.status(200).json({ message: "Cookie cleared" });
}
}

module.exports = authController;
