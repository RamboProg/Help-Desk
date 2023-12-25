const express = require('express');
const cron = require('node-cron');
const dotenv = require('dotenv');
const path = require('path');
const { exec } = require('child_process');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const port = 3001;
const dbUrl = process.env.MONGODB_URI;
console.log(dbUrl);
const backupPath = process.env.BACKUP_DIR;

const performBackup = () => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');

  const command = `mongodump --uri="${dbUrl}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during backup: ${stderr}`);
    } else {
      console.log(`Backup successful. Backup saved at: ${backupPath}/backup_${timestamp}`);
    }
  });
};

// Schedule the backup to run every day at midnight
cron.schedule('0 0 * * *', () => {
  performBackup();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
