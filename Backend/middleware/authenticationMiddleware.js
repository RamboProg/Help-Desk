const jwt  = require("jsonwebtoken");
const User = require('../models/User');
const authenticator = require('otplib');
const secretKey = authenticator.generateSecret();


module.exports = async function authenticationMiddleware(req, res, next){
     const token = req.header('Authorization');

     if (!token) {
       return res.status(401).json({ message: 'Access denied. No token provided.' });
     }
   
     try {
       // Verify the token and decode 
       const decoded = jwt.verify(token, secretKey);

       const user = await User.findById(decoded.userId);
        // Attach the decoded user information to the request object
       if(!user) return res.status(401).json({ message: 'Invalid token. User not Found.' });
          req.user = user;
       next();
     } catch (error) {
       res.status(401).json({ message: 'Invalid token.' });
     }
};

