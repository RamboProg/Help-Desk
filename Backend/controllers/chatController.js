const Chat = require('./models/chatModel'); 

exports.chat = async (req, res) => { //TODO chat endpoint 

}

const saveChat = async (message, fromId, toId) => { //function for saving chats
    try {

  
      // Create or update chat document
      const chat = new Chat({
        ClientID: data.clientId,
        Support_AgentID: data.supportAgentId,
        Messages: data.messages,
        Start_Time: data.startTime,
        End_Time: data.endTime,
        Message_Count: data.messages.length,
        Issue_Type: data.issueType,
      });
  
      // Save the chat to the database
      await chat.save();
  
      console.log('Chat saved successfully:', chat);
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };
  
  
  //------------------------------
  // import express from 'express';
  // // controllers
  // import chatRoom from '../controllers/chatRoom.js';
  
  // const router = express.Router();
  
  // router
  //   .get('/', chatRoom.getRecentConversation)
  //   .get('/:roomId', chatRoom.getConversationByRoomId)
  //   .post('/initiate', chatRoom.initiate)
  //   .post('/:roomId/message', chatRoom.postMessage)
  //   .put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)
  
  // export default router;
  
  
