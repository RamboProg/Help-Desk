// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const authController = require('../controllers/authController');


// router.post('/api/v1/auth/register', userController.registerUser); // register
// const  authenticateUser  = require('../middleware/authenticationMiddleware');
// router.get('/api/v1/profile',authenticateUser.authenticationMiddlewareFunction, userController.viewUserProfile); // View user profile
// router.put('/api/v1/users/:userId', authenticateUser.authenticationMiddlewareFunction, userController.updateUserProfile); // Update user profile
// router.put('/api/v1/auth/reset-password/request', userController.resetPassword); // Reset password request
// router.get('/api/v1/auth/QrImage', userController.getQRImage);
// router.get('/api/v1/auth/setMFA', userController.setMFA);


// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticationMiddleware');

// Apply the authentication middleware to protected routes
router.get('/api/v1/profile', authenticateUser.authenticationMiddlewareFunction, userController.viewUserProfile);
router.put('/api/v1/users/:userId', authenticateUser.authenticationMiddlewareFunction, userController.updateUserProfile);

// Registration route does not require authentication
router.post('/api/v1/auth/register', userController.registerUser);
router.post('/login', userController.loginUser);


// Other routes...
router.put('/api/v1/auth/reset-password/request', userController.resetPassword);
router.get('/api/v1/auth/QrImage', userController.getQRImage);
router.get('/api/v1/auth/setMFA', userController.setMFA);

module.exports = router;