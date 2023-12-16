const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const otplib = require('otplib');
const authenticator = otplib.authenticator;
const secretKey = authenticator.generateSecret();

// Generate a unique secret for each authentication
const authenticationMiddleware = {
   authenticationMiddlewareFunction: async (req, res, next) => {

    const token = req.header('Authorization');

  console.log("Authorization Token:", token);

  if (!token) {
    console.log("No token provided. Access denied.");
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and decode 
    const decoded = jwt.verify(token, secretKey);

    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.userId);

    console.log("User from Database:", user);

    // Attach the decoded user information to the request object
    if (!user) {
      console.log("Invalid token. User not found.");
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user;

    console.log("Authentication successful.");
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error.message);
    res.status(401).json({ message: 'Invalid token.' });
  }
},
};
module.exports = authenticationMiddleware;