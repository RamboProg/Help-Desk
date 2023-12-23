// // clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateUser = require('../middleware/authenticationMiddleware');

router.get('/api/v1/tickets', authenticateUser.authenticationMiddlewareFunction, clientController.getMyTickets);
router.post('/api/v1/tickets', authenticateUser.authenticationMiddlewareFunction, clientController.createTicket);
router.put('/api/v1/rateAgent', authenticateUser.authenticationMiddlewareFunction, clientController.rateAgent);

module.exports = router;
