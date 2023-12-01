// routes/chatRoute.js
import { Router } from 'express';
const router = Router();
import { chatController } from '../controllers/chatController';

// Define the chat endpoint
router.post('/api/v1/chat', chatController.startNewChat);
router.put('/api/v1/chat/:chatId', chatController.send_message);

export default router;
