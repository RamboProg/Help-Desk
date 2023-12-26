// chatController.js
const Chat = require('../models/chatModel');
const Ticket = require('../models/ticketModel');
const Message = require('../models/msgModel');

const chatController = {
  getChatIfExists: async (req, res) => {
    const { ticketId } = req.query;
    try {
      const chat = await Chat.findOne({ TicketID: ticketId });

      if (chat) {
        const messages = await Message.find({ ChatID: chat._id });
        res.status(200).json(messages);
      } else {
        const userId = req.user.userId;
        const agentId = await Ticket.findById(ticketId).select('Assigned_AgentID');

        const newChat = new Chat({
          Client_ID: userId,
          Support_AgentID: agentId,
          TicketID: ticketId,
          Start_Time: new Date(),
          End_Time: null, // You may set the end time based on your logic
          Message_Count: 0
        });

        await newChat.save();
        res.status(200).json([]); // Return an empty array if no messages initially
      }
    } catch (error) {
      console.error('Error creating or retrieving chat:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { ticketId } = req.query;
      const chat = await Chat.findOne({ TicketID: ticketId });

      if (chat) {
        const { message } = req.body;

        const newMessage = new Message({
          ChatID: chat._id,
          SenderID: req.user.userId,
          Message: message
        });

        await newMessage.save();

        chat.Message_Count += 1;
        chat.End_Time = new Date(); // Update end time when sending a message
        await chat.save();

        res.status(200).json(newMessage);
      } else {
        res.status(404).json({ message: 'Chat not found.' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = chatController;
