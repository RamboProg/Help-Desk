// // clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

router.get('/tickets', authorizationMiddleware([4]),clientController.getMyTickets);
router.post('/api/v1/tickets',authorizationMiddleware([4]) , clientController.createTicket);
router.put('/api/v1/rateAgent',authorizationMiddleware([4]), clientController.rateAgent);
// router.get('/tickets', clientController.clientTickets);

//router.get('/api/v1/client/getMyNotications', clientController.getMyNotications);
module.exports = router;