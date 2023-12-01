// models/chatModel.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  Support_AgentID: { type: Number, ref: 'Support_Agent', required: true },
  TicketID: { type: Number, ref: 'Ticket', required: true },
  Messages: { type: String },
  Chat_Start_Time: { type: Date },
  Final_Message_Time: { type: Date },
  Message_Count: { type: Number }
});

module.exports = mongoose.model('Chat', chatSchema);
