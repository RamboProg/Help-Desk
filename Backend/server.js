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

// Create the Express app
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use('/api/v1', authRouter);
app.use(authenticationMiddleware);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', reason);
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
app.use("/api/v1/users", userRouter);
app.use(authRouter);
app.use(workflowRouter);

// Configure Winston with MongoDB Transport
const logger = Winston.createLogger({
  format: Winston.format.combine(Winston.format.timestamp(), Winston.format.json()),
  transports: [
    new Winston.transports.Console(),
    new Winston.transports.File({ filename: 'error.log', level: 'error' }),
    new WinstonMongoDB.MongoDB({
      level: 'info', // or your desired level
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true
      },
      collection: 'logs' // Specify the collection name
    })
  ],
  exceptionHandlers: [
    new Winston.transports.Console(),
    new Winston.transports.File({ filename: 'exceptions.log' }),
    new WinstonMongoDB.MongoDB({
      level: 'info', // or your desired level
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true
      },
      collection: 'exceptions' // Specify the collection name
    })
  ]
});

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

// Route for ML model prediction
app.post('/predict', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3000/predict', req.body);
    res.json(response.data);
  } catch (error) {
    logger.error('Error calling Flask service:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error });
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

app.use(function (req, res, next) {
  res.status(500).send('Something broke!');
});

const Image = mongoose.model('Image', { imagePath: String });

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
