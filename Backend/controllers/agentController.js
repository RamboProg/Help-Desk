//import ticket model from separate file
const ticket = require("../models/ticketModel");
const client = require("../models/clientModel");
const Email = require("../models/emailModel");
// const agent = require("../models/agentModel");
const nodemailer = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");
const user = require("../models/userModel");

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.MAIL_ADD,
      pass: process.env.MAIL_PASS,
  },
});

const agentController = {

  closeTicket: async (req, res) => {
    try {
      console.log(1);
      if (!req.body || !req.body.status || !req.body.resolutionDetails) {
        return res.status(400).json({ message: 'Invalid request body' });
      }
      console.log(2);
      const ticketId = parseInt(req.params.ticketId);
      console.log(ticketId);
      console.log(3);
      const resolutionDetails = req.body.resolutionDetails;
      console.log(4);
      console.log(resolutionDetails);
      const tempTicket= await ticket.findOne({ _id: ticketId });
      console.log(tempTicket)
      console.log(5);
      const ticketOwner = tempTicket.Ticket_Owner;
      console.log(ticketOwner)
      const Client = await user.findById(ticketOwner);
      console.log(6);
      console.log(Client);
      // Find and update the ticket by its ID
      const updatedTicket = await ticket.findByIdAndUpdate(
        ticketId,
        { $set: { Status: "Closed", Resolution_Details: resolutionDetails } },
        { new: true } // Return the updated document
      );
      console.log(7);
        
      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      console.log(8);
      console.log(Client.Email);
      console.log(process.env.MAIL_ADD);
        var mailOptions = {
          from: process.env.MAIL_ADD,
          to: Client.Email,
          subject: "Your Ticket Status Has Been Closed",
          text: resolutionDetails,
        };
        console.log(9)
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(10);
  
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
      } 
        const clientID = Ticket.Ticket_Owner;
        const Client = await client.findOne({ _id: clientID });

        if (!Client) {
          return res.status(404).json({ message: "Client Not Found" });
        }
        if(Client.Email == null) {
            return res.status(404).json({ message: "Client Email Not Found" });
          }
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
          
      res.status(200).json({ message: "Ticket Updated" });
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },
  sendEmail: async (req, res) => {
    try {
      const {ticketId, message, subject} =req.body;
      const Ticket = await ticket.findOne({_id: ticketId});
      if(!Ticket){
        return res.status(404).json({message: "Ticket Not Found"});
      }
      const clientID=Ticket.Ticket_Owner;
      const Client = await client.findOne({_id: clientID});
      if(!Client){
        return res.status(404).json({message: "Client Not Found"});
      }
      if(Client.Email==null){
        return res.status(404).json({message: "Client Email Not Found"});
      }
      const mailOptions ={
        from : process.env.MAIL_ADD,
        to: Client.Email,
        subject: subject,
        text: message,
      }
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
      });
      console.log(Ticket.Assigned_AgentID);
      console.log(Ticket.Ticket_Owner);
      console.log(1);

      const newEmail = new Email({ 
        Subject: subject,
        Body: message,
        Sender: Ticket.Assigned_AgentID,
        Recipient: Ticket.Ticket_Owner,
        Date: Date.now(),
      });

      console.log(2);

      // Save the newEmail to the database
      await newEmail.save();
  
      console.log(3)
      res.status(200).json({message: "Email Sent"});

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({message: "server error"});
    }
   
  },
  getTickets: async (req, res) => {
    try {
      const { agentId } = req.query; // Use req.query to access query parameters
      const tickets = await ticket.find({ Assigned_AgentID: agentId });
  
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: "No tickets found for the given agent" });
      }
  
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = agentController;