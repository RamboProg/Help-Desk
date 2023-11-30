// Import required modules
const express = require('express');
// Create an instance of Express
const app = express();

const express = require('express');
const logger = require('./loggerController'); 
const Image = mongoose.model('Image', { imagePath: String });
const upload = multer({ storage: storage });



// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
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
mongoose.connect('mongodb+srv://<username>:<password>@helpdesk.3m5jos8.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Use the workflow router
app.use('/', workflowRouter);

//theme router
app.use('/themes', themeRoutes);

//Logo/Image upload
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


// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

