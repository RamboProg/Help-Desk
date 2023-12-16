const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authenticator = require('otplib');
const bcrypt = require('bcryptjs');
const admin = require("../models/adminModel");
//const qrcode = require('qrcode');
//const crypto = require('crypto');

async function generateToken(id){
return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
}

const authController = {
  loginUser: async (req, res) => {
    try {
      console.log("Login request received:", req.body);

      const { email, password, code } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "email and password are required" });
      }

      console.log("Searching for user in the database...");
      const user = await User.findOne({ Email: email });

      if (!user) {
        console.log("User not found:", email);
        return res.status(401).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.Passsword);

      if (!isPasswordValid) {
        console.log("Invalid credentials for user:", email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("User authenticated successfully:", email);

      if (!user.MFA_Enabled) {
      const accessToken = generateToken(user._id);
      //create secure cookie with refresh token
      // res.cookie("jwt", accessToken, {
      //   httpOnly: true,
      //   //secure: true,
      //   sameSite: "None",
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });
      console.log(accessToken);
      return res.status(200).json({ message: "Logged in " },accessToken);
    }
      const verified = await authenticator.check(code, user.secret);
      if (!verified) {
        console.log("Invalid code for user:", user.Username);
        return res.status(401).json({ message: "Invalid Code" });
      }
      const accessToken = generateToken(user._id);
      console.long(accessToken);
      console.log("Logged in successfully with MFA:", accessToken);
      return res.status(200).json({ message: "Logged in" });
    } catch (error) {
      console.error("Error in login:", error.message);
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


module.exports = authController;