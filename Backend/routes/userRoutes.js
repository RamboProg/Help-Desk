<<<<<<< HEAD
// userRoutes.js

=======
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
const express = require('express');
const router = express.Router();
const { userController, getUser } = require('../controllers/userController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
// const authenticateUser = require('../middleware/authenticationMiddleware');

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
