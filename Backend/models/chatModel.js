const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    ClientID: { type: Number, ref: 'Client', required: true },
    Support_AgentID: { type: Number, ref: 'Support_Agent', required: true },
    Messages: { type: String },
    Start_Time: { type: Date },
    End_Time: { type: Date },
    Message_Count: { type: Number },
    Issue_Type: { type: String }
  });

module.exports = mongoose.model('Chat', chatSchema);
module.exports.Schema = chatSchema;