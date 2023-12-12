// Example Express.js Route
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Customization = require('../models/customizationModel');

// Get customization settings for a specific organization
router.get('/api/v1/editAppearance/:theme', async (req, res) => {
  try {
    const themeString = req.params.theme;
    const customization = await Customization.findOne({ themeString });
    res.json(customization);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update customization settings for a specific organization
router.post('/api/v1/editAppearance/:theme/:orgID', async (req, res) => {
  try {
    const themeString = req.params.theme;
    const orgID = req.params.orgID;
    const updatedCustomization = req.body; // Assuming the request body contains the updated customization
    
    // Assuming that you want to update customization based on both theme and orgID
    await Customization.findOneAndUpdate({ themeString, orgID }, updatedCustomization);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
