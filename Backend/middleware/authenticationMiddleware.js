// authenticationMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticationMiddleware = {
  
 authenticationMiddlewareFunction: async (req, res, next) => {  
    try {
      if(req.cookies.jwt){
      console.log('Token: here', req.cookies.jwt);
      // Verify token
      const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id);

      // Log user information for debugging
      console.log('Authenticated User:', req.user);

      return next();
      }
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      res.status(401).json({ message: 'Not authorised' });
    }
  

 
},
};

module.exports = authenticationMiddleware;