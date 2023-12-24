const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Username: { type: String, required: true },
    PhoneNumber: { type: String },
    RoleID: { type: Number },
    MFA_Enabled: { type: Boolean },
    Is_Enabled: { type: Boolean },
    theme: { type: String },
    logoPath: { type: String },
    salt :{type: String}
  });

module.exports = mongoose.model('User', userSchema);
module.exports.Schema = userSchema; 
