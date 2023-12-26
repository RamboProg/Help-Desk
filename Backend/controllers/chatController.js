// chatController.js
const Chat = require('../models/chatModel');
const Ticket = require('../models/ticketModel');

const chatController = {
  // Controller function to start a new chat
  getChatIfExists: async (req, res) => {
    const { ticketId } = req.query;
    // const ticketId = 28;
    console.log('ticketId', ticketId);
    try {
      const chat = await Chat.findOne({ TicketID: ticketId });

      if (chat) {
        res.status(200).json(chat.Messages);
      } else {
        const userId = req.user.userId;
        const agentId = await Ticket.findById(ticketId).select('Assigned_AgentID');
        console.log(agentId)

        // Create a new chat instance
        const newChat = new Chat({
          Client_ID: userId,
          Support_AgentID: agentId,
          TicketID: ticketId,
          Messages: [],
          Chat_Start_Time: new Date(),
          Final_Message_Time: new Date(),
          Message_Count: 0
        });

        // Save the chat to the database
        await newChat.save();
        res.status(200).json(newChat.Messages); // Return the messages of the new chat
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

        // Assuming the request body contains a 'message' field
        chat.Messages.push({ text: message, sender: req.user.username });
        chat.Message_Count += 1;
        chat.Final_Message_Time = new Date();

        // Update other fields as needed
        const updatedChat = await chat.save();
        res.status(200).json(updatedChat.Messages);
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
