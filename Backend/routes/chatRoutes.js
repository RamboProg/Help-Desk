// routes/chatRoute.js
const { Router } = require('express');
const router = Router();
const { getChatIfExists, sendMessage } = require('../controllers/chatController');

// Define the chat endpoint
router.get('/chat', getChatIfExists);
router.put('/chat/:chatId', sendMessage);

module.exports = router;
