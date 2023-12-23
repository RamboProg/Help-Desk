//import ticket model from separate file
const ticket = require("../models/ticketModel");
const client = require("../models/clientModel");
const nodemailer = require("nodemailer");

// exports.closeTicket = async (req, res) => {
//   try {
//     const ticketId = parseInt(req.params.ticketId);
//     const status = req.body.status;
//     const resolutionDetails = req.body.resolutionDetails;

//     // Find and update the ticket by its ID
//     const updatedTicket = await ticket.findByIdAndUpdate(
//       ticketId,
//       { $set: { Status: status, Resolution_Details: resolutionDetails } },
//       { new: true } // Return the updated document
//     );

//     if (!updatedTicket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

//     return res.status(201).json(updatedTicket);
//   } catch (e) {
//     console.log("Could not close ticket", e.message);
//     return res.status(400).send(e.message);
//   }

// }

const agentController = {

  closeTicket: async (req, res) => {
    try {

      if (!req.body || !req.body.status || !req.body.resolutionDetails) {
        return res.status(400).json({ message: 'Invalid request body' });
      }

      const ticketId = parseInt(req.params.ticketId);
      const status = req.body.status;
      const resolutionDetails = req.body.resolutionDetails;
  
      // Find and update the ticket by its ID
      const updatedTicket = await ticket.findByIdAndUpdate(
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
  
  },

  updateTicket: async (req, res) => {
    try {
      const { status, message } = req.body;
      const ticketId = req.params.ticketId;

      const Ticket = await ticket.findOneAndUpdate(
        { _id: ticketId },
        { $set: { status: status, message: message } },
        { new: true }
      );
      if (!Ticket) {
        return res.status(404).json({ message: "Ticket Not Found" });
      } else {
        const clientID = Ticket.Ticket_Owner;
        const Client = await client.findOne({ _id: clientID });
        if (!Client) {
          return res.status(404).json({ message: "Client Not Found" });
        } else {
          if (Client.Email == null) {
            return res.status(404).json({ message: "Client Email Not Found" });
          } else {
            if (status === "closed") {
              var transporter = nodemailer.createTransport({
                service: "GMAIL",
                auth: {
                  user: process.env.MAIL_ADD,
                  pass: process.env.MAIL_PASS,
                },
              });
              var mailOptions = {
                from: process.env.MAIL_ADD,
                to: Client.Email,
                subject: "Your Ticket Status Has Been Closed",
                text: message,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            } else {
              var transporter = nodemailer.createTransport({
                service: "GMAIL",
                auth: {
                  user: process.env.MAIL_ADD,
                  pass: process.env.MAIL_PASS,
                },
              });
              var mailOptions = {
                from: "helpdesk.notis@gmail.com",
                to: Client.Email,
                subject: "Your Ticket Status Has Been Updated",
                text: message,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },
};

module.exports = agentController;