const { Schema, model, Types } = require('mongoose');

const emailSchema = new Schema({

  Subject: { type: String, required: true },
  Body: { type: String, required: true },
  Sender: { type: Number, required: true, ref: 'Support_Agent' },
  Recipient: { type: Number, required: true, ref: 'Client' },
  Date: { type: Date, required: true },
});

const Email = model('Email', emailSchema);
module.exports = Email;
