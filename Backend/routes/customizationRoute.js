// Example Express.js Route
const express = require('express');
const router = express.Router();
const customizationController = require('../controllers/customizationController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

router.get('/Appearance', authorizationMiddleware([1, 2, 3, 4]), customizationController.getAllUniqueCustomizations);
router.post('/editAppearance', authorizationMiddleware([1]), customizationController.updateAllUsersCustomization);

module.exports = router;