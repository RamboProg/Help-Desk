import { highPriorityQueue, assignTicket } from '../controllers/ticketController';
import Ticket from '../models/Ticket';

import express from 'express';
const router = express.Router();

app.post('/new-ticket', async (req, res) => {
    const { priority, type, issueType, description } = req.body;
    const newTicket = new Ticket({ Priority: priority, Type: type, Issue_Type: issueType, Description: description });
    
    // Save the new ticket to the database
    await newTicket.save();

    // Enqueue the ticket based on its priority
    if (priority === 'high') {
        highPriorityQueue.enqueue(newTicket);
    }    // ... handle for medium and low priorities

    // Try to assign the ticket
    await assignTicket();

    res.status(200).send('Ticket created and queued.');
});

export default router;

