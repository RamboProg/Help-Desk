// clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/tickets', clientController.clientTickets);

router.post('/api/v1/tickets', (req, res) => {
  getUser(req)
    .then(({ _id }) => clientController.createTicket(req, _id))
    .then((result) => res.status(201).json(result))
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.put('/api/v1/rateAgent', (req, res) => {
  getUser(req)
    .then(({ _id }) => clientController.rateAgent(req, _id))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;