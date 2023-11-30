const Chat = require('../models/chatModel.js'); 


//call saveMessage within chat endpoint
const saveMessage = async (message, ticketId, supportAgentId) => {
  try {
    
    let chat = await Chat.findOne({ TicketID: ticketId, Support_AgentID: supportAgentId });

    if (!chat) {
      //if the chat doesn't exist, create a new one
      chat = new Chat({
        Support_AgentID: supportAgentId,
        TicketID: ticketId,
        Messages: message,
        Chat_Start_Time: new Date(),
        Final_Message_Time: new Date(),
        Message_Count: 1, // set initial message count
      });
    } else {
      //if the chat already exists, update the existing document
      chat.Messages += `\n${message}`; //append the new message to string of messages
      chat.Final_Message_Time = new Date(); //update end time
      chat.Message_Count += 1; // increment message count
    }

    
    await chat.save();//save chat document to the database

    console.log('Message saved successfully.');
  } catch (error) {
    console.error('Error saving message:', error.message);
  }
};

