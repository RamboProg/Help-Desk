const { userController } = require('../controllers/userController');
const express = require('express');
const router = express.Router();

// Registration route does not require authentication
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = async function(req, res, next) {
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return res.status(301).redirect('/');
  }

  // We then get the session of the user from our session map
  // that we set in the signinHandler
  const userSession = await db.select('*').from('se_project.sessions').where('token', sessionToken).first();
  if (!userSession) {
    // If the session token is not present in session map, return an unauthorized error
    return res.status(301).redirect('/');
  }
  // if the session has expired, return an unauthorized error, and delete the 
  // session from our map
  if (new Date() > userSession.expiresat) {
    return res.status(301).redirect('/');
  }

  // If all checks have passed, we can consider the user authenticated and
  next();
};
