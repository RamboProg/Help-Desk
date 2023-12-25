// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/api/v1/reports/tickets', managerController.getAllTickets);
router.get('/api/v1/manager/getAgents', managerController.getAgents);
router.get('/api/v1/reports/tickets/:status', managerController.getTicketsByStatus);
router.get('/api/v1/reports/tickets/agent/:agentId', managerController.getTicketsByAgent);
router.get('/api/v1/reports/tickets/priority/:priority', managerController.getTicketsByPriority);
router.get('/api/v1/reports/tickets/issueType/:issueType', managerController.getTicketsByIssueType);
router.get('/api/v1/reports/tickets/subIssueType/:subIssueType', managerController.getTicketsBySubIssueType);
router.get('/api/v1/reports/tickets/dateRange/:startDate/:endDate', managerController.getTicketsByDateRange);
router.get('/api/v1/reports/tickets/resolutionTime/:resolution', managerController.getTicketsByResolutionTime); 
router.get('/api/v1/reports/tickets/TicketAnalytics/Status/:Status', managerController.getTicketAnalyticsByStatus);
router.get('/api/v1/reports/tickets/TicketAnalytics/Priority/:Priority', managerController.getTicketAnalyticsByPriority);
router.get('/api/v1/reports/tickets/TicketAnalytics/IssueType/:Issue_Type', managerController.getTicketAnalyticsByIssueType);
router.get('/api/v1/reports/tickets/TicketAnalytics/subIssueType/:subIssueType', managerController.getTicketAnalyticsBySubIssueType);

// New route for fetching ticket data for a specific agent
router.get('/api/v1/reports/tickets/agent/:agentId', managerController.getTicketsByAgent);

module.exports = router;
