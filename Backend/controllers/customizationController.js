// controllers/customizationController.js
const Customization = require('../models/customizationModel');
const User = require('../models/userModel');

exports.getUserCustomization = async (req, res) => {
  try {
    const userId = req.params._id;
    const customization = await Customization.findOne({ userId });

    if (!customization) {
      return res.status(404).json({ message: 'Customization not found' });
    }

    res.status(200).json(customization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserCustomization = async (req, res) => {
  try {
    const userId = req.params._id;
    const { theme, logoPath } = req.body;

    // Update or create customization settings for the user
    await Customization.findOneAndUpdate(
      { userId },
      { $set: { theme, logoPath } },
      { upsert: true, new: true }
    );

    // Update the user's theme in the user model
    await User.findOneAndUpdate({ _id: userId }, { $set: { theme } });

    res.status(200).json({ message: 'Customization updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
