// routes/chatRoute.js
const { Router } = require('express');
const router = Router();
const { getChatIfExists, sendMessage } = require('../controllers/chatController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

// Define the chat endpoint
router.get('/chat',authorizationMiddleware([3,4]), getChatIfExists);
router.put('/chat', authorizationMiddleware([3,4]),sendMessage);

module.exports = router;