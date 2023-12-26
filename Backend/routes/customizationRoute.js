// Example Express.js Route
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const customizationController = require('../controllers/customizationController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

router.get('/api/v1/Appearance/',authorizationMiddleware([1,2,3,4]) ,customizationController.getAllUniqueCustomizations);
router.post('/api/v1/editAppearance/', authorizationMiddleware([1]),customizationController.updateAllUsersCustomization);


module.exports = router;