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
      req.user = await User.findById(decoded.id);

      

      // // Log user information for debugging
      // console.log('Authenticated User:', req.user);

      next();
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      res.status(401).json({ message: 'Not authorised' });
    }
  }

  if (!token) {
    return res.status(405).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach the decoded user ID to the request object for further use
    // console.log(decoded.user)
    
    req.user = decoded.user;
    next();
  });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
};