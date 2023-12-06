// logger.js
const { createLogger, format, transports } = require('winston');
require('dotenv').config(); // Load environment variables from .env file
const winstonMongoDB = require('winston-mongodb');

const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' }),
      new winstonMongoDB.MongoDB({
        level: 'error', // Log only errors to MongoDB
        db: process.env.MONGO_URI,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        collection: 'logsModel', // Name of the collection in MongoDB database
      }),
    ],
    exceptionHandlers: [
      new transports.Console(),
      new transports.File({ filename: 'exceptions.log' }),
      new winstonMongoDB.MongoDB({
        level: 'exception', // Log only exceptions to MongoDB
        db: process.env.MONGO_URI,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        collection: 'logsModel', // Name of the collection in MongoDB database
      }),
    ],
  });
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
  });
  
  module.exports = logger;


