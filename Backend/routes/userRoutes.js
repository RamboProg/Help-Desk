const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController');
const authorizationMiddleware= require('../middleware/authorizationMiddleware');

// Apply the authentication middleware to protected routes
router.get('/profile', authorizationMiddleware([1,2,3,4]), userController.viewUserProfile);
router.put('/api/v1/users/:userId', authenticateUser.authenticationMiddlewareFunction, userController.updateUserProfile);

// Registration route does not require authentication
router.post('/api/v1/auth/register', userController.registerUser);
router.post('/login', userController.loginUser);


// Other routes...
router.put('/reset-password', userController.resetPassword);
router.get('/api/v1/auth/QrImage', userController.getQRImage);
router.post('/setMFA', userController.setMFA);

module.exports = router;