const { Schema, model } = require('mongoose');


const ticketSchema = new Schema({
    _id: { type: Number, required: true },
    Status: { type: String },
    Assigned_AgentID: { type: Number, ref: 'Support_Agent', required: true },
    Ticket_Owner: { type: Number, ref: 'Client', required: true },
    Issue_Type: { type: String },
    Description: { type: String },
    Priority: { type: String },
    Resolution_Details: { type: String },
    Start_Date : {type: Date},
    End_Date : {type: Date},
    Sub_Issue_Type: { type: String, required: true }
  });

  const Ticket = model('Ticket', ticketSchema);
  module.exports = Ticket;

