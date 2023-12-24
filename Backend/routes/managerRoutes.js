// routes/manager.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/api/v1/reports/tickets', managerController.getAllTickets);

module.exports = router;