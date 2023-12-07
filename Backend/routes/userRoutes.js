const express = require('express');
const router = express.Router();
const { viewUserProfile, updateUserProfile, resetPassword, getQRImage, setMFA } = require('../controllers/userController');
const {loginUser} = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const verifyJWT = require('../middleware/verifyJWT')


router.post('/api/v1/auth/login', loginUser); //Login user

router.post('/api/v1/auth/reset-password/request', resetPassword);

router.get('/api/v1/auth/QrImage', getQRImage);

router.get('/api/v1/auth/setMFA', setMFA);

router.use(verifyJWT)

router.get('/api/v1/profile', viewUserProfile); //View user profile

router.put('/api/v1/profile/update',  updateUserProfile); //Update user profile


module.exports = router;
