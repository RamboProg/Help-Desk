  const mongoose = require('mongoose');

  const issueSchema = new mongoose.Schema({
    
        Issue: {type: String },
        Custom_Workflow : { type: String },
        Sub_Issue_Type: { type: String, required: true }
  });

  module.exports = mongoose.model('Issue', issueSchema);
  module.exports.Schema = issueSchema;
