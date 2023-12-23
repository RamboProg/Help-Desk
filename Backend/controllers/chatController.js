const Chat = require('../models/chatModel');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/ticketModel');

const chatController = {
  // Controller function to start a new chat
  startNewChat: async (req, res) => {
    try {
      const _id = req.user.userId;
      const { TicketId } = req.body;
      // Extract user information from the JWT
      // console.log(_id);
      // verify the ticket belongs to the user
      const ticket = await Ticket.findById(TicketId);
      if (ticket.Ticket_Owner != _id) {
        res.status(403).json({ success: false, error: 'Forbidden' });
      }

      // Create a new chat instance
      const newChat = new Chat({
        Support_AgentID: Ticket.find({ _id: TicketId }).Assigned_AgentID,
        TicketID: TicketId, // Replace with the actual Ticket ID
        Chat_Start_Time: new Date(),
        Final_Message_Time: new Date(),
        Message_Count: 0
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating new chat:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
  send_message: async (req, res) => {
    try {
      const { chatId } = req.params;
      const { Username } = req.user;
      const { message } = req.body;

      // Save the message to the database
      const chat = await Chat.findById(chatId);
      chat.Messages.push({ message, Username });
      await chat.save();

      // Update the final message time and message count
      chat.Final_Message_Time = new Date();
      chat.Message_Count += 1;
      await chat.save();

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
};

module.exports = chatController;
