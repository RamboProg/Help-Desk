const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

// Get Custom_Workflow based on Issue
router.get('/api/v1/workflows', workflowController.getWorkflow);

module.exports = router;
