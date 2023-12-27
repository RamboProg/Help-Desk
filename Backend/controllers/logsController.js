const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const logsController = {
  getLogs: async (req, res) => {
    try {
      // Create a new MongoDB client connection
      console.log('Connecting to ' + process.env.MONGODB_URI + '...');
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const db = client.db('test');
      const collection = db.collection('logsModel');
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
  }
};

module.exports = logsController;