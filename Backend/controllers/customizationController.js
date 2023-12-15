// controllers/customizationController.js
const Customization = require('../models/customizationModel');
const User = require('../models/userModel');

exports.getAllUniqueCustomizations = async (req, res) => {
  try {
    const uniqueThemes = await User.distinct('theme');
    const uniqueLogoPaths = await User.distinct('logoPath');

    const uniqueCustomizations = {
      uniqueThemes,
      uniqueLogoPaths
    };

    res.status(200).json(uniqueCustomizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateAllUsersCustomization = async (req, res) => {
  try {
    const { theme, logoPath } = req.body;

    // Update or create customization settings for all users
    await Customization.updateMany({}, { $set: { theme, logoPath } }, { upsert: true });

    // Update the theme in all user models
    await User.updateMany({}, { $set: { theme } });

    res.status(200).json({ message: 'Customization updated successfully for all users' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
