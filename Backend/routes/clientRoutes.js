import express from 'express';
import router from express.Router();
import { clientController } from '../controllers/clientController';

router.get('/api/v1/tickets', clientController.getMyTickets);
router.post('/api/v1/tickets', clientController.createTicket);
router.put('/api/v1/rateAgent', clientController.rateAgent);