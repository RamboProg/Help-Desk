const Chat = require('../models/chatModel');
const Ticket = require('../models/ticketModel');

const chatController = {
  // Controller function to start a new chat
  getChatIfExists: async (req, res) => {
    const { TicketId } = req.query;
    try {
      const chat = await Chat.findOne({ TicketID: TicketId });

      if (chat) {
        res.status(200).json(chat.Messages);
      } else {
        const userId = req.user.userId;
        const agentId = await Ticket.findById(TicketId).select('Assigned_AgentID');
        // console.log(_id);

        // Create a new chat instance
        const newChat = new Chat({
          Support_AgentID: agentId, // Assuming userId is the Support Agent ID from JWT
          TicketID: TicketId, // Replace with the actual Ticket ID
          Messages: "",
          Chat_Start_Time: new Date(),
          Final_Message_Time: new Date(),
          Message_Count: 0
        });
      }

      // Save the chat to the database
      await newChat.save();
      res.status(200).json(newChat);
    } catch (error) {
      console.error('Error creating new chat:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
  sendMessage: async (req, res) => {
    try {
      const chat = await Chat.findById(req.params.chatID);
  
      if (chat) {
        // Assuming the request body contains a 'message' field
        chat.Messages.push(req.body.message);
        chat.Message_Count += 1;
        chat.Final_Message_Time = new Date();
        // Update other fields as needed
  
        const updatedChat = await chat.save();
        res.status(200).json(updatedChat);
      } else {
        res.status(404).json({ message: 'Chat not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Additional controller functions for handling Socket.IO connections, disconnections, etc., can be added here
};

module.exports = chatController;
