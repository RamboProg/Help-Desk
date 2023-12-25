// import io from 'socket.io';
// import Chat from '../models/chatModel.js';
const io = require('socket.io');
const Chat = require('../models/chatModel');
const { getUser } = require('./userController');

// const saveChat = async (message, fromId, toId) => { //function for saving chats
//   try {
//     // Create or update chat document
//     const chat = new Chat({
//       ClientID: data.clientId,
//       Support_AgentID: data.supportAgentId,
//       Messages: data.messages,
//       Chat_Start_Time: data.Chat_Start_Time,
//       Final_Message_Time: data.Final_Message_Time,
//       Message_Count: data.messages.length,
//       Issue_Type: data.issueType,
//     });

//     // Save the chat to the database
//     await chat.save();

//     console.log('Chat saved successfully:', chat);
//   } catch (error) {
//     console.error('Error saving chat:', error);
//   }
// };

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
// import chatModel from '../models/chatModel.js';
// import { Socket } from 'socket.io';

// exports.send_message = function(req, res) {
//     chatModel.findOneAndUpdate(
//         { _id: req.params.chatId },
//         { $push: { messages: req.body } },
//         { new: true },
//         function(err, chat) {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(chat);
//         }
//     );
// }
