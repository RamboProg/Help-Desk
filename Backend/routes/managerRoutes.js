// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/api/v1/reports/tickets', managerController.getAllTickets);
router.get('/api/v1/reports/tickets/:status', managerController.getTicketsByStatus);
router.get('/api/v1/reports/tickets/agent/:agentId', managerController.getTicketsByAgent);
router.get('/api/v1/reports/tickets/priority/:priority', managerController.getTicketsByPriority);
<<<<<<< HEAD
router.get('/api/v1/reports/tickets/dateRange/:startDate/:endDate', managerController.getTicketsByDateRange);
router.get('/api/v1/reports/tickets/resolutionTime/:resolution', managerController.getTicketsByResolutionTime); 
router.get('/api/v1/reports/tickets/issueType/:issueType', managerController.getTicketsByIssueType);
router.get('/api/v1/reports/tickets/subIssueType/:subIssueType', managerController.getTicketsBySubIssueType);
router.get('/api/v1/reports/tickets/TicketAnalytics/Status/:Status', managerController.getTicketAnalyticsByStatus);
router.get('/api/v1/reports/tickets/TicketAnalytics/IssueType/:Issue_Type', managerController.getTicketAnalyticsByIssueType);
router.get('/api/v1/reports/tickets/TicketAnalytics/Priority/:Priority', managerController.getTicketAnalyticsByPriority);
router.get('/api/v1/reports/tickets/TicketAnalytics/subIssueType/:subIssueType', managerController.getTicketAnalyticsBySubIssueType);

module.exports = router;
=======
router.get('/api/v1/reports/tickets/issueType/:issueType', managerController.getTicketsByIssueType);
router.get('/api/v1/reports/tickets/subIssueType/:subIssueType', managerController.getTicketsBySubIssueType);
router.get('/api/v1/reports/tickets/dateRange/:startDate/:endDate', managerController.getTicketsByDateRange);
router.get('/api/v1/reports/tickets/resolutionTime/:resolution', managerController.getTicketsByResolutionTime); 
router.get('/api/v1/reports/tickets/TicketAnalytics/Status/:Status', managerController.getTicketAnalyticsByStatus);
router.get('/api/v1/reports/tickets/TicketAnalytics/Priority/:Priority', managerController.getTicketAnalyticsByPriority);
router.get('/api/v1/reports/tickets/TicketAnalytics/IssueType/:Issue_Type', managerController.getTicketAnalyticsByIssueType);
router.get('/api/v1/reports/tickets/TicketAnalytics/subIssueType/:subIssueType', managerController.getTicketAnalyticsBySubIssueType);


router.get('/api/v1/reports/tickets/ticketsId/:ticketId', managerController.getTicketById);
router.get('/api/v1/reports/tickets/agentId/:agentId', managerController.getAgentById);

module.exports = router;
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
