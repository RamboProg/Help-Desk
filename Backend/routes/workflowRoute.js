const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

// Get Custom_Workflow based on Issue
router.get('/api/v1/workflows/:issuesid', workflowController.getWorkflow);
router.post('/api/v1/workflows/:issuesid', workflowController.createWorkflow);
router.put('/api/v1/workflows/:issuesid', workflowController.updateWorkflow);

module.exports = router;
