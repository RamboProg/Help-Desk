// Import required modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); // Add this line for bodyParser
const mongoose = require('mongoose');
const multer = require('multer'); // Move multer import to here
const path = require('path'); // Add this line for path

// Import routes
const workflowRouter = require('./routes/workflowRoute');
const login= require("./routes/authRoutes");


dotenv.config();

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

app.use('/api/tickets', require('./routes/ticketRoutes'));

const upload = multer({ storage: storage });

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
app.use('/workflow', workflowRouter);


io.on('connection', (socket) => {
    console.log('A user connected');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*                     Rambo's Code                    */
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('Connected to MongoDB'); }).catch((err) => { console.log(err); })

app.use('/api/v1/auth', login);
// Use the workflow router
app.use('/', workflowRouter);

// Use the login router




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
