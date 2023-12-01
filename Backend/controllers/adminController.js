const User = require('../models/userModel');

exports.updateUserTheme = async (req, res) => {
    try {
      const userId = req.params._id;
      const newTheme = req.body.theme;
  
      // TODO: Validate the new theme value before updating the database
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { theme: newTheme },
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Theme updated successfully', theme: updatedUser.theme });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  