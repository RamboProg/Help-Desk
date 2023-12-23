const ticketController = require('../controllers/ticketController');
const assignTicket = ticketController.assignTicket;
const highPriorityQueue = ticketController.highPriorityQueue;
const mediumPriorityQueue = ticketController.mediumPriorityQueue;
const lowPriorityQueue = ticketController.lowPriorityQueue;
const Ticket = require('../models/ticketModel');


const express = require('express');
const router = express.Router();

// router.post('/api/v1/newTicket', async (req, res) => {
//     const { priority, type, issueType, description } = req.body;
//     const newTicket = new Ticket({ Priority: priority, Type: type, Issue_Type: issueType, Description: description });

//     // Save the new ticket to the database
//     await newTicket.save();

//     // Enqueue the ticket based on its priority
//     if (priority === 'high') {
//         highPriorityQueue.enqueue(newTicket);
//     }
//     if (priority === 'medium') {
//         mediumPriorityQueue.enqueue(newTicket);
//     }
//     if (priority === 'low') {
//         lowPriorityQueue.enqueue(newTicket);
//     }
// // switch to an if cond
//     // Try to assign the ticket
//     await assignTicket();

//     res.status(200).send('Ticket created and queued.');
// });

module.exports = router;
