const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const Winston = require('winston');
const WinstonMongoDB = require('winston-mongodb');
const workflowRouter = require('./routes/workflowRoute');
const axios = require('axios');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const authernicationMiddleware = require('./middleware/authenticationMiddleware');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Configure Winston with MongoDB Transport
const logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.timestamp(),
    Winston.format.json()
  ),
  transports: [
    new Winston.transports.Console(),
    new Winston.transports.File({ filename: 'error.log', level: 'error' }),
    new WinstonMongoDB.MongoDB({
      level: 'info', // or your desired level
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'logs', // Specify the collection name
    }),
  ],
  exceptionHandlers: [
    new Winston.transports.Console(),
    new Winston.transports.File({ filename: 'exceptions.log' }),
    new WinstonMongoDB.MongoDB({
      level: 'info', // or your desired level
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'exceptions', // Specify the collection name
    }),
  ],
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);
connectDB();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Route for ML model prediction
app.post('/predict-agent', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3000/predict', req.body);
    res.json(response.data);
  } catch (error) {
    logger.error('Error calling Flask service:', error);
    res.status(500).send('Internal Server Error');
  }
});

const upload = multer({ storage: storage });

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
app.use('/workflow', workflowRouter);
app.use('/auth', require('./routes/authRoutes'));

const Image = mongoose.model('Image', { imagePath: String });

io.on('connection', (socket) => {
  logger.info('A user connected');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
