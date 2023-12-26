const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

router.post('/api/v1/agent/tickets/close',authorizationMiddleware([3]), agentController.closeTicket); //close ticket

// const {updateTicket} = require('../controllers/agentController');

// router.post('/api/v1/agent/tickets/update/:ticketId',updateTicket);
router.post('/api/v1/agent/tickets/update/:ticketId',authorizationMiddleware([3]), agentController.updateTicket);
router.post('/sendEmail', agentController.sendEmail);
router.get('/api/v1/agent/getTickets',authorizationMiddleware([3]), agentController.getTickets);
router.get('/api/v1/agent/getMyNotications',authorizationMiddleware([3]), agentController.getMyNotications);

module.exports = router;

