// authenticationMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticationMiddleware = {
  
 authenticationMiddlewareFunction: async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      // Log user information for debugging
      console.log('Authenticated User:', req.user);

      next();
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      res.status(401).json({ message: 'Not authorised' });
    }
  }

  if (!token) {
    console.error('No token found in the headers');
    res.status(401).json({ message: 'Not authorised, no token' });
  }
},
};

module.exports = authenticationMiddleware;
