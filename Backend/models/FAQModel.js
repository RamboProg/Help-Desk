const mongoose = require('mongoose');

// Mongoose schema definitions
const faqSchema = new mongoose.Schema({
    Question: { type: String },
    Answer: { type: String },
    Category: { type: String },
    Sub_Category: { type: String }
  });

module.exports = mongoose.model('FAQ', faqSchema);
model.exports.Schema = faqSchema;
