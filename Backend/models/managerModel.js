const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    _id: { type: Number, ref: 'User', required: true },
    Email: { type: String, ref: 'User', required: true },
    Password: { type: String, ref: 'User', required: true },
    Username: { type: String, ref: 'User', required: true },
    PhoneNumber: { type: String, ref: 'User' },
    RoleID: 2,
    MFA_Enabled: { type: Boolean, ref: 'User' },
    Is_Enabled: { type: Boolean, ref: 'User' },
    Salt : {type: String, ref: 'User'}
  });

module.exports = mongoose.model('Manager', managerSchema);
module.exports.Schema = managerSchema;