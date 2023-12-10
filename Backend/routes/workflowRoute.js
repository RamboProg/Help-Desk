const express = require('express');
const router = express.Router();
const logger = require('../controllers/loggerController');
const workflowController = require('../controllers/workflowController');

// Get Custom_Workflow based on Issue
router.get('/api/v1/workflows/:issuesid', workflowController.getWorkflow);
router.put('/api/v1/workflows/:issuesid', workflowController.createWorkflow);
router.post('/api/v1/workflows/:issuesid', workflowController.updateWorkflow);

module.exports = router;
