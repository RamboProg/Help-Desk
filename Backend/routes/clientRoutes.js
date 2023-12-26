// // clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateUser = require('../middleware/authenticationMiddleware');

router.get('/tickets', clientController.getMyTickets);
router.post('/api/v1/tickets', clientController.createTicket);
router.put('/api/v1/rateAgent', clientController.rateAgent);
// router.get('/tickets', clientController.clientTickets);

//router.get('/api/v1/client/getMyNotications', clientController.getMyNotications);
module.exports = router;