//function for saving chat

const Chat = require('./models/chatModel'); 

const saveChat = async (message, fromId, toId) => {
  try {
//TODO use getuser , find out if this is a client or agent and set th
    //TODO get user id using chat
    //get user id of person being chatted to from parseInt(req.params.userId)
    //increase message count by 1
    //add message string from req body to 

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


