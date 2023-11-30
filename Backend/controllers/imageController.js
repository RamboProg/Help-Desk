// controllers/imageController.js

const User = require('../models/userModel');

const uploadImage = async (req, res) => {
  try {
    // Assuming 'imagePath' is the key where Multer saves the file path
    const imagePath = req.file.getUser().logoPath;

    // Create a new image document in MongoDB
    const newImage = new Image({ imagePath });
    await newImage.save();

    res.json({ imagePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadImage };
