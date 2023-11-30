import Chat from '../models/chatModel.js';
import io from 'socket.io';

export const chatController = {
  send_message: async (req, res) => {
    try {
      const chatId = req.params.chatId;
      const { message, sender_id } = req.body;

      // Save the message to the database
      const chat = await Chat.findById(chatId);
      chat.Messages.push({ message, sender_id });
      await chat.save();

      // Update the final message time and message count
      chat.Final_Message_Time = new Date();
      chat.Message_Count += 1;
      await chat.save();

      // Emit the message to all connected clients in the chat room
      io.emit(`chat_${chatId}`, { message, senderType });

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