const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController.js');

router.post('/api/v1/agent/tickets/close/:ticketId', agentController.closeTicket); //close ticket

module.exports = router;




