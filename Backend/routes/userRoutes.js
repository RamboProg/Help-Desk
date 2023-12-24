const express = require('express');
const router = express.Router();
const { userController, getUser } = require('../controllers/userController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
// const authenticateUser = require('../middleware/authenticationMiddleware');

// Apply the authentication middleware to protected routes
// 1: Admin, 2: Manager, 3: Support Agent, 4: Client
router.get('/api/v1/profile', authorizationMiddleware([1,2,3,4]), userController.viewUserProfile);
router.put('/api/v1/users/:userId', authorizationMiddleware([1,2,3,4]), userController.updateUserProfile);


// Other routes...
router.put('/api/v1/auth/reset-password/request', userController.resetPassword);
router.get('/api/v1/auth/QrImage', userController.getQRImage);
router.get('/api/v1/auth/setMFA', userController.setMFA);

module.exports = router;