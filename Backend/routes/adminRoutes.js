const express = require('express');
const router = express.Router();
const { createNewUser } = require('../controllers/adminController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/api/v1/users', authenticateUser, createNewUser);

module.exports = router;