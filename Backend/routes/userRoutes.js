// userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Route for updating user profile
router.put('/api/v1/profile', authenticateUser, updateUserProfile);

// Route for user registration
router.post('/api/v1/register', registerUser);

// Route for user login
router.post('/api/v1/auth/login', loginUser);


module.exports = router;