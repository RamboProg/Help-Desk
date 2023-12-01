const express = require('express');
const router = express.Router();
const { registerUser, loginUser, viewUserProfile, updateUserProfile, resetPassword, getQRImage, setMFA } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/api/v1/profile', authenticateUser, viewUserProfile); //View user profile

router.put('/api/v1/profile/update', authenticateUser, updateUserProfile); //Update user profile

router.post('/api/v1/users', registerUser); //Register user

router.post('/api/v1/auth/login', loginUser); //Login user

router.post('/api/v1/auth/reset-password/request', resetPassword);

router.get('/api/v1/auth/QrImage', getQRImage);

router.get('/api/v1/auth/setMFA', setMFA);

module.exports = router;