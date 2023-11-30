import express from 'express';
import router from express.Router();
import { chatController } from '../controllers/chatController.js';

router.put('/api/v1/chat/:chatId', chatController.send_message);