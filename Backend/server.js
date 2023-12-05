// Import required modules
const express = require('express');
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

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/getUser')

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*                     Rambo's Code                    */
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('Connected to MongoDB'); }).catch((err) => { console.log(err); })

// Use the workflow router
app.use('/', workflowRouter);



// Logo/Image upload
app.post('/api/v1/images', upload.single('image'), async (req, res) => {
    try {
        const image = new Image({ imagePath: req.file.path });
        await image.save();
        res.status(201).json({ image });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});
