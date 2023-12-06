const mongoose = require('mongoose');

const supportAgentSchema = new mongoose.Schema({
    _id: { type: Number, ref: 'User', required: true },
    Email: { type: String, ref: 'User', required: true },
    Password: { type: String, ref: 'User', required: true },
    Username: { type: String, ref: 'User', required: true },
    PhoneNumber: { type: String, ref: 'User' },
    RoleID: {type:Number, default:3},
    MFA_Enabled: { type: Boolean, ref: 'User' },
    Is_Enabled: { type: Boolean, ref: 'User' },
    Pref_Type: { type: String },
    Average_Rating: { type: Number },
    Ticket_Count: { type: Number },
    Active_Tickets: { type: Number },
<<<<<<< HEAD
    Salt : {type: String, ref: 'User'},
});
=======
    Salt : {type: String, ref: 'User'}});

>>>>>>> 1b072bed3ccae64f238b0b3fd4c1e62a6e961b26
module.exports = mongoose.model('SupportAgent', supportAgentSchema);
module.exports.Schema = supportAgentSchema;
