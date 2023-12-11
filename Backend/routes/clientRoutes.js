// clientRoutes.js
const express = require('express');
const router = express.Router();
const { clientController } = require('../controllers/clientController');

router.get('/api/v1/tickets', clientController.getMyTickets);
router.post('/api/v1/tickets', clientController.createTicket);
router.put('/api/v1/rateAgent', clientController.rateAgent);

module.exports = router;
