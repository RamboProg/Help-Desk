const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB connected:  ${conn.connection.host}');
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
}
module.exports = connectDB;