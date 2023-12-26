// Import required modules
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const mongoose = require('mongoose');
const multer = require('multer'); // Move multer import to here
const path = require('path'); // Add this line for path
const Winston = require('winston'); // Add this line for Winston
const WinstonMongoDB = require('winston-mongodb');
const axios = require('axios'); // Add this line for Winston MongoDB transport
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
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
//   })
// );
// app.use(cors());

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:4000', // specify your frontend's origin
    credentials: true
  })
);

const tempRouter = require('./routes/tempRoutes');
app.use(tempRouter);

app.use('/api/v1', authRouter);
app.use(authenticationMiddleware);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', reason);
});

const MongoClient = require('mongodb').MongoClient;

app.get('/api/logs', async (req, res) => {
  try {
    // Create a new MongoDB client connection
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('test');
    const collection = db.collection('logs');
    // Fetch logs from the MongoDB collection
    const logs = await collection.find({}).toArray();
    if (logs.length === 0) {
      console.warn('No logs found.');
      return res.status(404).json({ error: 'No logs found' });
    }
    res.json(logs);
    // Close the MongoDB client connection
    client.close();
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs', details: error.message });
  }
});


// Import routes
const FAQ = require('./models/FAQModel');
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

//use the routes
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

const logger = require('./controllers/loggerController');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });
app.use('/api/tickets', require('./routes/ticketRoutes'));


// Import routes
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

const Image = mongoose.model('Image', { imagePath: String });

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
    // io.emit(`chat_${data.ticketId}`, { text: data.message, sender: data.userId });
    socket.broadcast.emit(`chat_${data.ticketId}`, {
      Message: data.message,
      SenderID: data.userId
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});