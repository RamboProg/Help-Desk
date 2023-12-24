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
// 1: Admin, 2: Manager, 3: Support Agent, 4: Client
router.get('/api/v1/profile', authorizationMiddleware([1,2,3,4]), userController.viewUserProfile);
router.put('/api/v1/users/:userId', authorizationMiddleware([1,2,3,4]), userController.updateUserProfile);


// Other routes...
router.put('/api/v1/auth/reset-password/request', userController.resetPassword);
router.get('/api/v1/auth/QrImage', userController.getQRImage);
router.get('/api/v1/auth/setMFA', userController.setMFA);

module.exports = router;