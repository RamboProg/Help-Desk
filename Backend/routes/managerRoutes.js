// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/api/v1/reports/tickets', managerController.getAllTickets);
router.get('/api/v1/manager/getAgents', managerController.getAgents);

module.exports = router;
