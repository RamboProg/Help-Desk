    const mongoose = require('mongoose');

    const otpSchema = new mongoose.Schema({
        email: { type: String, unique: true },
        otp: { type: String, },
        createdAt:{type:Date},
        expiredAt:{type:Date}
    });

    module.exports = mongoose.model('otp', otpSchema);
    module.exports.Schema = otpSchema;