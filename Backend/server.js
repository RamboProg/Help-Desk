// Import required modules
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Create an instance of Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for a new chat message
  socket.on('chat_message', (msg) => {
    console.log(`Message: ${msg}`);
    socket.join(msg.chatId);
  });
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
