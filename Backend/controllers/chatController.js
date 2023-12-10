// import io from 'socket.io';
// import Chat from '../models/chatModel.js';
const io = require('socket.io')(server);
const Chat = require('../models/chatModel');
const jwt = require('jsonwebtoken');

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

export const chatController = {
  // Controller function to start a new chat
  startNewChat: async (req, res) => {
    try {
      const { Message } = req.body;

      // Extract user information from the JWT
      const { userId } = req.user;

      // Create a new chat instance
      const newChat = new Chat({
        Support_AgentID: userId, // Assuming userId is the Support Agent ID from JWT
        TicketID: 456, // Replace with the actual Ticket ID
        Messages: Message,
        Chat_Start_Time: new Date(),
        Final_Message_Time: null,
        Message_Count: 1
      });

      // Emit a socket event to inform connected clients about the new chat
      req.io.emit('newChat', saveChat);

      // For demonstration purposes, let's just send a response with the saved chat details
      res.json({ success: true, chat: saveChat });
    } catch (error) {
      console.error('Error creating new chat:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
  send_message: async (req, res) => {
    try {
      const { chatId } = req.params;
      const { Username } = await getUser(req);
      const { message } = req.body;

      // Save the message to the database
      const chat = await Chat.findById(chatId);
      chat.Messages.push({ message, Username });
      await chat.save();

      // Update the final message time and message count
      chat.Final_Message_Time = new Date();
      chat.Message_Count += 1;
      await chat.save();

      // Emit the message to all connected clients in the chat room
      io.emit(`chat_${chatId}`, { message, Username });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  // Additional controller functions for handling Socket.IO connections, disconnections, etc., can be added here
};


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

