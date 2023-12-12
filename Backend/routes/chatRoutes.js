// routes/chatRoute.js
const { Router } = require('express');
const router = Router();
const { startNewChat, send_message } = require('../controllers/chatController');

// Define the chat endpoint
router.post('/api/v1/chat', startNewChat);
router.put('/api/v1/chat/:chatId', send_message);

module.exports = router;
