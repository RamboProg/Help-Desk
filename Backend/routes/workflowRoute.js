const express = require('express');
const router = express.Router();
const logger = require('../controllers/loggerController');
const workflowController = require('../controllers/workflowController');

// Get Custom_Workflow based on Issue
router.get('/workflows/:issuesid', workflowController.getWorkflow);
router.post('/workflows', workflowController.createWorkflow);
router.delete('/workflows/:issuesid', workflowController.deleteWorkflow);
router.get('/getWorkflows', workflowController.getAllWorkflows);


module.exports = router;