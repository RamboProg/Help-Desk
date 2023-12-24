const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController');
router.get('/getMFA', userController.getMFA);
router.post('/sendOTP', userController.sendOTP);

module.exports = router;