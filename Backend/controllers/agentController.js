const ticket = require("../models/ticketModel");
const client = require("../models/clientModel");
const nodemailer = require(" nodemailer");
const agentController = {
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
                service: "gmail",
                auth: {
                  user: "helpdesk.notis@gmail.com",
                  pass: "SeProject1",
                },
              });
              var mailOptions = {
                from: "helpdesk.notis@gmail.com",
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
                service: "gmail",
                auth: {
                  user: "helpdesk.notis@gmail.com",
                  pass: "SeProject1",
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