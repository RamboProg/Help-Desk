// routes/imageRoutes.js
const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the destination for Multer

router.post('/upload', upload.single('image'), imageController.uploadImage);

module.exports = router;