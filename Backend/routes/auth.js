const { userController } = require('../controllers/userController');
const express = require('express');
const router = express.Router();

// Registration route does not require authentication
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
