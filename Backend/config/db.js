const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = 
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('MongoDB Connected: ${conn.connection.host}');
    } catch (error) {
        console.error('Error: ${error.message}');
        process.exit();
    }
};

module.exports = connectDB;