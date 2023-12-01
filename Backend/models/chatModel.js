import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    _id: { type: Number, required: true },
    Support_AgentID: { type: Number, ref: 'Support_Agent', required: true },
    TicketID: { type: Number, ref: 'Ticket', required: true },
    Chat_Start_Time: { type: Date },
    Final_Message_Time: { type: Date },
    Message_Count: { type: Number }
  });

export default model('Chat', chatSchema);
export const Schema = chatSchema;
