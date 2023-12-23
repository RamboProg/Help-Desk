// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/api/v1/reports/tickets', managerController.getAllTickets);
router.get('/api/v1/manager/getAgents', managerController.getAgents);
router.get('/api/v1/reports/tickets/:status', managerController.getTicketsByStatus);
router.get('/api/v1/reports/tickets/agent/:agentId', managerController.getTicketsByAgent);
router.get('/api/v1/reports/tickets/priority/:priority', managerController.getTicketsByPriority);
router.get('/api/v1/reports/tickets/:startDate/:endDate', managerController.getTicketsByDateRange);
router.get('/api/v1/reports/tickets/:resolution', managerController.getTicketsByResolutionTime);
router.get('/api/v1/reports/tickets/:issueType', managerController.getTicketsByIssueType);
router.get('api/v1/reports/tickets/:subIssueType', managerController.getTicketsBySubIssueType);


module.exports = router;
