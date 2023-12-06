const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    Client_ID: { type: Number, ref: 'Client', required: true},
    Support_AgentID: { type: Number, ref: 'Support_Agent', required: true },
    Messages: { type: String },
    Start_Time: { type: Date },
    End_Time: { type: Date },
    Message_Count: { type: Number },
    TicketID: { type: String, ref: 'Ticket' }
  });

module.exports = mongoose.model('Chat', chatSchema);
module.exports.Schema = chatSchema;
