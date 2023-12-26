// // clientRoutes.js
// const express = require('express');
// const router = express.Router();
// const { clientController } = require('../controllers/clientController');
// const { getUser } = require('../controllers/userController');
// const { _id } = await getUser(req);
// router.get('/api/v1/tickets', clientController.getMyTickets);
// router.post('/api/v1/tickets', clientController.createTicket);
// router.put('/api/v1/rateAgent', clientController.rateAgent);

// module.exports = router;|


// clientRoutes.js
const express = require('express');
const router = express.Router();
const { clientController } = require('../controllers/clientController');
const { getUser } = require('../controllers/userController');

router.get('/api/v1/tickets', (req, res) => {
  getUser(req)
    .then(({ _id }) => clientController.getMyTickets(_id))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/api/v1/tickets', (req, res) => {
  getUser(req)
    .then(({ _id }) => clientController.createTicket(req, _id))
    .then((result) => res.status(201).json(result))
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
router.put('/api/v1/rateAgent', (req, res) => {
  getUser(req)
    .then(({ _id }) => clientController.rateAgent(req, _id))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
<<<<<<< HEAD
=======
router.get('/api/v1/clientTickets', clientController.clientTickets);
router.post('/api/v1/tickets', clientController.createTicket);
router.put('/api/v1/rateAgent', clientController.rateAgent);
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
=======
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be

module.exports = router;