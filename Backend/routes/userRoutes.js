const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

// Apply the authentication middleware to protected routes
// 1: Admin, 2: Manager, 3: Support Agent, 4: Client
router.get('/profile', authorizationMiddleware([1, 2, 3, 4]), userController.viewUserProfile);
router.put('/api/v1/users/:userId', authorizationMiddleware([1, 2, 3, 4]), userController.updateUserProfile);


// Other routes...
router.put('/reset-password', userController.resetPassword);
router.post('/setMFA', userController.setMFA);
// router.post('/sendOTP', userController.sendOTP);
router.post('/verifyOTP', userController.verifyOTP);
// router.get('/getMFA', userController.getMFA);

module.exports = router;