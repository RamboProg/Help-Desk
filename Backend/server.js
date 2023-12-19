// Import required modules
require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); // Add this line for bodyParser
const mongoose = require('mongoose');
const multer = require('multer'); // Move multer import to here
const path = require('path'); // Add this line for path
const Winston = require('winston'); // Add this line for Winston
const WinstonMongoDB = require('winston-mongodb');
const axios = require('axios'); // Add this line for Winston MongoDB transport

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', reason);
});



// Import routes
const workflowRouter = require('./routes/workflowRoute');
const authRoutes= require("./routes/authRoutes");
const ticketRoutes = require('./routes/ticketRoutes');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
// const authFile = require('./routes/auth'); //commented because of error
// const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes'); //commented because of error
const clientRoutes = require('./routes/clientRoutes');
const customizationRoute = require('./routes/customizationRoute');
const imageRoute = require('./routes/imageRoute');
const managerRoutes = require('./routes/managerRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const authorizationMiddleware = require('./middleware/authorizationMiddleware');







const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);




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
// app.post('/predict', async (req, res) => {
//   try {
//     const response = await axios.post('http://localhost:3000/predict', req.body);
//     res.json(response.data);
//   } catch (error) {
//     logger.error('Error calling Flask service:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(authenticationMiddleware.authenticationMiddlewareFunction);
// app.use(authorizationMiddleware.authorizationMiddlewareFunction);


//use the routes
app.use(ticketRoutes);
app.use(agentRoutes);
app.use(adminRoutes);
// app.use(authFile);
// app.use(authRoutes);
app.use(chatRoutes); //commented because of errors
app.use(clientRoutes);
app.use(customizationRoute);
app.use(imageRoute);
app.use(managerRoutes);
app.use(userRoutes);
app.use(authRoutes);


const upload = multer({ storage: storage });
app.use('/api/tickets', require('./routes/ticketRoutes'));

io.on('connection', (socket) => {
    console.log('A user connected');
});

app.get('/getUser')

// Import routes
app.use('/workflow', workflowRouter);
app.use('/auth', require('./routes/authRoutes'));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('Connected to MongoDB'); }).catch((err) => { console.log(err); })

// Use the workflow router
app.use('/', workflowRouter);

const Image = mongoose.model('Image', { imagePath: String });

io.on('connection', (socket) => {
  logger.info('A user connected');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
