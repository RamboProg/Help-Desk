const express = require('express');
const router = express.Router();
const logger = require('../controllers/loggerController');
const workflowController = require('../controllers/workflowController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
// Get Custom_Workflow based on Issue
router.get('/workflows/:issueName',authorizationMiddleware([4]), workflowController.getWorkflow); 
router.post('/workflows',authorizationMiddleware([3]), workflowController.createWorkflow);
router.delete('/workflows/:issuesid', authorizationMiddleware([3]), workflowController.deleteWorkflow);
router.get('/getWorkflows', authorizationMiddleware([3]), workflowController.getAllWorkflows);


module.exports = router;