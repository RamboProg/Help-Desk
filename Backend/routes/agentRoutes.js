const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');


router.post('/api/v1/agent/tickets/close/:ticketId', agentController.closeTicket); //close ticket

// const {updateTicket} = require('../controllers/agentController');

// router.post('/api/v1/agent/tickets/update/:ticketId',updateTicket);
router.post('/api/v1/agent/tickets/update/:ticketId', agentController.updateTicket);
router.post('/sendEmail', agentController.sendEmail);
router.get('/api/v1/agent/getTickets', agentController.getTickets);


<<<<<<< HEAD
router.get("/api/v1/agentTickets", agentController.getAllAgentTickets
); //get all tickets
module.exports = router;
=======
module.exports = router;

>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
