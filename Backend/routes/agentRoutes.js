const express = require('express');
const router = express.Router();
const {updateTicket} = require('../controllers/agentController');

router.post('/api/v1/agent/tickets/update/:ticketId',updateTicket);

module.exports = router;