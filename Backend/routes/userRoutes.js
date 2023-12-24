const express = require('express');
const router = express.Router();
const { userController, getUser } = require('../controllers/userController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
// const authenticateUser = require('../middleware/authenticationMiddleware');

// Apply the authentication middleware to protected routes
//there is a problem here so yea we need to fix it  in the router.get view User profile with both
//router.get('/api/v1/profile', authenticateUser.authenticationMiddlewareFunction, userController.viewUserProfile);
//router.put('/api/v1/users/:userId', authenticateUser.authenticationMiddlewareFunction, userController.updateUserProfile);

// Registration route does not require authentication
router.post('/api/v1/auth/register', userController.registerUser);
router.post('/login', userController.loginUser);
// router.post('/sendOTP', userController.sendOTP);
// router.post('/verifyOTP', userController.verifyOTP);
//router.post('/verifyOTPRegister', userController.verifyOTPForRegister);
router.post('/setMFA', userController.setMFA);
// router.get('/getMFA',userController.getMFA);
// Other routes...
router.put('/api/v1/auth/reset-password/request', userController.resetPassword);
// router.post('/api/v1/auth/setMFA', userController.setMFA);
// router.get('/verify/:userId/:uniqueString', userController.verifyUser);
// router.post('/logout', userController.logoutUser);


module.exports = router;
