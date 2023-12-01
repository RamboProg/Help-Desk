// logsModel.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  //If it's an error or exception
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  //If any extra info is needed
  meta: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
