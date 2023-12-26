<<<<<<< HEAD
<<<<<<< HEAD
// userRoutes.js

=======
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
=======
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


>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticationMiddleware');

// Registration route does not require authentication
router.post('/api/v1/auth/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/sendOTP', userController.sendOTP);
router.post('/verifyOTP', userController.verifyOTP);
router.post('/setMFA', userController.setMFA);
router.get('/getMFA', userController.getMFA);
router.put('/api/v1/auth/reset-password/request', userController.resetPassword);
router.post('/logout', userController.logoutUser);

// Apply the authentication middleware to protected routes
router.get('/api/v1/profile', authenticateUser, userController.viewUserProfile);
router.put('/api/v1/users/:userId', authenticateUser, userController.updateUserProfile);

module.exports = router;
