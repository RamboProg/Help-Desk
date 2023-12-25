const express = require('express');
const cron = require('node-cron');
const dotenv = require('dotenv');
const path = require('path');
const { spawn } = require('child_process');
const { exec } = require('child_process');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const dbUrl = process.env.MONGODB_URI;
console.log(dbUrl);
const backupPath = process.env.BACKUP_DIR;

const performBackup = () => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');

  const command = `mongodump --uri="${dbUrl}" --gzip`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during backup: ${stderr}`);
    } else {
      console.log(`Backup successful. Backup saved at: ${backupPath}/backup_${timestamp}`);
    }
  });
};

// Schedule the backup to run every day at midnight

const performRestore = () => {
  const mongoUriRestore = process.env.MONGODB_URI_RESTORE;

  console.log("Restoring backup");
  const backUpPath = "C:\\Users\\Elnour Tech\\OneDrive\\Desktop\\Software Project\\Help-Desk\\Backend"; // Adjust this path
  console.log(backUpPath);
  console.log(mongoUriRestore);
  const mongorestoreCommand = "mongorestore";
  const argsRestore = [
    `--uri=${mongoUriRestore}`,
    `--gzip`, // Optional: if the backup was created with mongodump --gzip // Optional: drop collections before restoring
    `${backUpPath}\\dump`
  ];

  const mongorestoreProcess = spawn(mongorestoreCommand, argsRestore);

  mongorestoreProcess.stdout.on("data", (data) => {
    console.log(`mongorestore stdout: ${data}`);
  });

  mongorestoreProcess.stderr.on("data", (data) => {
    console.error(`mongorestore stderr: ${data}`);
  });

  mongorestoreProcess.on("close", (code) => {
    console.log(`mongorestore process exited with code ${code}`);
  });

  mongorestoreProcess.on("error", (err) => {
    console.error("Failed to start mongorestore process:", err);
  });
};

 cron.schedule('0 0 * * * *', () => {
  performBackup();
  performRestore();
 });



