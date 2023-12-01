const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const bodyParser = require('body-parser'); // Add this line for bodyParser
const mongoose = require('mongoose');
const multer = require('multer'); // Move multer import to here
const path = require('path'); // Add this line for path
require('dotenv').config();

// Import routes
const workflowRouter = require('./routes/workflowRoute');

// Create an instance of Express
const app = express();

//const loggerController = require('./controllers/loggerController');
const Image = mongoose.model('Image', { imagePath: String });

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

const upload = multer({ storage: storage }); // Now you can use multer

import http from 'http';
import { Server } from 'socket.io';

// Create an instance of Express
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
