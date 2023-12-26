// models/chatModel.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  Client_ID: { type: Number, ref: 'Client', required: true },
  Support_AgentID: { type: Number, ref: 'Support_Agent', required: true },
  Start_Time: { type: Date },
  End_Time: { type: Date },
  Message_Count: { type: Number },
  TicketID: { type: Number, ref: 'Ticket' }
});
module.exports = mongoose.model('Chat', chatSchema);
