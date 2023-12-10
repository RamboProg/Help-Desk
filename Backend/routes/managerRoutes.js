// routes/manager.js
import { Router } from 'express';
const router = Router();
import { managerController } from '../controllers/managerController.js';

router.get('/api/v1/reports/tickets', managerController.getAllTickets);