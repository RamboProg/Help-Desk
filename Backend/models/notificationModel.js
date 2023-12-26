const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    Receiver:{ type: Number, ref: 'User', required: true },
    Sender:{ type: Number, ref: 'User', required: true },
    Message: { type: String},
    Date: { type: Date },
    Read: { type: Boolean, default: false },
});
module.exports = mongoose.model('Notifications', notificationSchema);
module.exports.Schema = notificationSchema;
