const express = require('express');
const router = express.Router();
const { createNewUser } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/api/v1/users', authenticateUser, createNewUser);

module.exports = router;