// logger.js
require('dotenv').config(); // Load environment variables from .env file
const { createLogger, format, transports } = require('winston');
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
        level: 'error',
        db: process.env.MONGODB_URI, // Directly use the connection string
        collection: 'logsModel',
      }),
      
    ],
    exceptionHandlers: [
      new transports.Console(),
      new transports.File({ filename: 'exceptions.log' }),
      new winstonMongoDB.MongoDB({
        level: 'exception',
        db: process.env.MONGODB_URI, // Directly use the connection string
        collection: 'logsModel',
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


