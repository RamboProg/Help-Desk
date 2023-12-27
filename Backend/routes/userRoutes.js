const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

// Apply the authentication middleware to protected routes
// 1: Admin, 2: Manager, 3: Support Agent, 4: Client
router.get('/profile', authorizationMiddleware([1, 2, 3, 4]), userController.viewUserProfile);
router.put('/:userId',authorizationMiddleware([1,2,3,4]), userController.updateUserProfile);
router.post('/logout',authorizationMiddleware([1,2,3,4]), userController.logoutUser);


// Other routes...
router.post('/reset-password',authorizationMiddleware([1,2,3,4]), userController.resetPassword);
router.post('/setMFA',authorizationMiddleware([1,2,3,4]), userController.setMFA);
// router.post('/sendOTP', userController.sendOTP);
// router.post('/verifyOTP', userController.verifyOTP);
// router.get('/getMFA', userController.getMFA);

module.exports = router;