const { createLogger, format, transports } = require('winston');
require('winston-mongodb');

const logger = createLogger({
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