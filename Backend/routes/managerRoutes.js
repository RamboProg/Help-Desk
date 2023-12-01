// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/tickets/:ticketId/status', managerController.getTicketStatus);
router.get('/tickets/:ticketId/resolution-time', managerController.getResolutionTime);
router.get('/tickets/:ticketId/agent-performance', managerController.getAgentPerformance);

module.exports = router;