// routes/chatRoute.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Define the chat endpoint
router.post('/chat', chatController.chat);

module.exports = router;
