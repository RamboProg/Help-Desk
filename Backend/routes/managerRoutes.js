// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

router.get('/api/v1/reports/tickets',authorizationMiddleware([2]), managerController.getAllTickets);
router.get('/api/v1/manager/getAgents',authorizationMiddleware([2]), managerController.getAgents);
router.get('/api/v1/reports/tickets/:status',authorizationMiddleware([2]), managerController.getTicketsByStatus);
router.get('/api/v1/reports/tickets/agent/:agentId',authorizationMiddleware([2]), managerController.getTicketsByAgent);
router.get('/api/v1/reports/tickets/priority/:priority',authorizationMiddleware([2]), managerController.getTicketsByPriority);
router.get('/api/v1/reports/tickets/issueType/:issueType',authorizationMiddleware([2]), managerController.getTicketsByIssueType);
router.get('/api/v1/reports/tickets/subIssueType/:subIssueType',authorizationMiddleware([2]), managerController.getTicketsBySubIssueType);
router.get('/api/v1/reports/tickets/dateRange/:startDate/:endDate', authorizationMiddleware([2]),managerController.getTicketsByDateRange);
router.get('/api/v1/reports/tickets/resolutionTime/:resolution',authorizationMiddleware([2]), managerController.getTicketsByResolutionTime); 
router.get('/api/v1/reports/tickets/TicketAnalytics/Status/:Status',authorizationMiddleware([2]), managerController.getTicketAnalyticsByStatus);
router.get('/api/v1/reports/tickets/TicketAnalytics/Priority/:Priority',authorizationMiddleware([2]), managerController.getTicketAnalyticsByPriority);
router.get('/api/v1/reports/tickets/TicketAnalytics/IssueType/:Issue_Type',authorizationMiddleware([2]), managerController.getTicketAnalyticsByIssueType);
router.get('/api/v1/reports/tickets/TicketAnalytics/subIssueType/:subIssueType',authorizationMiddleware([2]), managerController.getTicketAnalyticsBySubIssueType);


router.get('/api/v1/reports/tickets/ticketsId/:ticketId',authorizationMiddleware([2]), managerController.getTicketById);
router.get('/api/v1/reports/tickets/agentId/:agentId',authorizationMiddleware([2]), managerController.getAgentById);
router.get('/api/v1/manager/getMyNotications',authorizationMiddleware([2]), managerController.getMyNotications);

module.exports = router;
