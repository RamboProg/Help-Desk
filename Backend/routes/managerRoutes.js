// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
router.get('/api/v1/auth/manager/tickets/:ticketId', managerController.getTicketStatus,managerController.getResolutionTime,managerController.getAgentPerformance);
module.exports = router;