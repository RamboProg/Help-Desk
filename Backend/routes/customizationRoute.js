// Example Express.js Route
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const customizationController = require('../controllers/customizationController');


router.get('/api/v1/Appearance/', customizationController.getAllUniqueCustomizations);
router.post('/api/v1/editAppearance/', customizationController.updateAllUsersCustomization);


module.exports = router;