//import ticket model from separate file
const Ticket = require('./models/ticketModel');

//close ticket
app.post("/api/v1/agent/tickets/close/:ticketId", async (req, res) => {
    try {
        const ticketId = parseInt(req.params.ticketId);
        const status = req.body.status;
        const resolutionDetails = req.body.resolutionDetails;

        // Find and update the ticket by its ID
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { $set: { Status: status, Resolution_Details: resolutionDetails } },
            { new: true } // Return the updated document
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.status(201).json(updatedTicket);
    } catch (e) {
        console.log("Could not close ticket", e.message);
        return res.status(400).send(e.message);
    }
});





