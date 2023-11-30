const Chat = require('../models/chatModel.js'); 


const saveMessage = async (message, ticketid, supportAgentId) => {
  try {
    
    let chat = await Chat.findOne({ Ticket_ID: ticketid, Support_AgentID: supportAgentId }); //check if the chat already exists based on ticketid and supportAgentId

    if (!chat) {
      //if the chat doesn't exist, create a new one
      chat = new Chat({
        Ticket_ID: ticketid,
        Support_AgentID: supportAgentId,
        Messages: message,
        Start_Time: new Date(),
        End_Time: new Date(),
        Message_Count: 1, // set initial message count
      });
    } else {
      //if the chat already exists, update the existing document
      chat.Messages += `\n${message}`; //append the new message to string of messages
      chat.End_Time = new Date(); //update end time
      chat.Message_Count += 1; // increment message count
    }

    
    await chat.save();//save chat document to the database

    console.log('Message saved successfully.');
  } catch (error) {
    console.error('Error saving message:', error.message);
  }
};

module.exports = saveMessage;

//const user = await getUser(req)
// const { user_id } = await getUser(req)