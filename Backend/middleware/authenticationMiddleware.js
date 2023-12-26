<<<<<<< HEAD
<<<<<<< HEAD
const jwt = require("jsonwebtoken");


module.exports = function authenticationMiddleware(req, res, next) {
  try {
    const cookie = req.cookies;
  
  // console.log(req.headers);

  if (!cookie) {
    return res.status(401).json({ message: "No Cookie provided" });
=======
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
=======
const jwt = require("jsonwebtoken");
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be


module.exports = function authenticationMiddleware(req, res, next) {
  try {
    const cookie = req.cookies;
  
  // console.log(req.headers);

  if (!cookie) {
<<<<<<< HEAD
    return res.status(401).json({ message: 'No Cookie provided' });
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
=======
    return res.status(401).json({ message: "No Cookie provided" });
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
  }
  const token = cookie.token;
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