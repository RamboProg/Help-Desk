// logger.js
require('dotenv').config(); // Load environment variables from .env file
const { createLogger, format, transports } = require('winston');
const winstonMongoDB = require('winston-mongodb');


const logger = createLogger({
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
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
  
  // Handle uncaught exceptionsf
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
  });
  
  module.exports = logger;
<<<<<<< HEAD
=======
  transports: [
    // Log both errors and exceptions to the same 'logs' collection in MongoDB
    new transports.MongoDB({
      db: process.env.MONGODB_URI,
      collection: 'logs',
      level: 'error',  // Log errors and exceptions
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

module.exports = logger;
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
=======


>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
