const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    Status: { type: String },
    Assigned_AgentID: { type: Number, ref: 'Support_Agent', required: true },
    Ticket_Owner: { type: Number, ref: 'Client', required: true },
    Issue_Type: { type: String },
    Description: { type: String },
    Priority: { type: String },
    Resolution_Details: { type: String },
    Rating: { type: Number },
    Runtime: { type: Date }
  });

module.exports = mongoose.model('Ticket', ticketSchema);
model.exports.Schema = ticketSchema;