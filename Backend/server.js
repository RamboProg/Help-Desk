// Import required modules
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const socketIo = require('socket.io');

// Create the Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS for all routes
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// we don't need these to authenticate before access
const tempRouter = require('./routes/tempRoutes');
app.use(tempRouter);

app.use('/api/v1', authRouter);
app.use(authenticationMiddleware);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', reason);
});

// Import routes
const workflowRouter = require('./routes/workflowRoute');
const ticketRoutes = require('./routes/ticketRoutes');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const chatRoutes = require('./routes/chatRoutes');
const clientRoutes = require('./routes/clientRoutes');
const customizationRoute = require('./routes/customizationRoute');
const imageRoute = require('./routes/imageRoute');
const managerRoutes = require('./routes/managerRoutes');
const userRouter = require('./routes/userRoutes');
const logsRouter = require('./routes/logsRoutes');
const logger = require('./controllers/loggerController');

// Use the routes
app.use(ticketRoutes);
app.use(agentRoutes);
app.use(adminRoutes);
app.use(chatRoutes);
app.use(clientRoutes);
app.use(customizationRoute);
app.use(imageRoute);
app.use(managerRoutes);
app.use(workflowRouter);
app.use("/api/v1/users", userRouter);
app.use(authRouter);
app.use(logsRouter)
app.use('/api/tickets', ticketRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(`Something broke! Error: ${err.message}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle messages
  socket.on('sendMessage', (data) => {
    socket.broadcast.emit(`chat_${data.ticketId}`, {
      Message: data.message,
      SenderID: data.userId
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});