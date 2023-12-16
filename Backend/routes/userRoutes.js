const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authenticationMiddleware');

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
//router.post('/api/v1/auth/login', authController.loginUser); // Login user
router.get('/api/v1/profile', userController.viewUserProfile); // View user profile
router.put('/api/v1/users/:userId', userController.updateUserProfile); // Update user profile
router.put('/api/v1/auth/reset-password/request', userController.resetPassword); // Reset password request
router.get('/api/v1/auth/QrImage', userController.getQRImage);
router.get('/api/v1/auth/setMFA', userController.setMFA);


module.exports = router;
