const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticator = require('otplib');
const bcrypt = require('bcryptjs');
const qrcode = require('qrcode');
const crypto = require('crypto');
const userModel = require('../models/userModel.js');
const adminModel = require('../models/adminModel.js');
const managerModel = require('../models/managerModel.js');
const agentModel = require('../models/agentModel.js');
const clientModel = require('../models/clientModel.js');
const Customization = require('../models/customizationModel');

// Function to generate salt
// async function generateSalt() {
//   return bcrypt.genSalt(10); // 10 is the number of rounds for the salt generation
// }
// async function hashPassword(password, salt) {
//   try {
//     const hashedPassword = await bcrypt.hash(password, salt);
//     return hashedPassword;
//   } catch (error) {
//     throw error;
//   }
// }

// const authentication = require('../middleware/authenticationMiddleware');
//  // Function to get user based on role
//  async function getUser(req, res) {
//     try {
//         const Token = req.header('Authorization');
//         const decoded = jwt.verify(Token, process.env.SECRET_KEY);

//     } catch (error) {
//         console.error('Error could not get user', error);
//         throw error;
//     }
// }

const userController = {
  registerUser: async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    if (!username || !email || !password || !phoneNumber) {
      res.status(400);
      throw new Error('Please add your name, email, phone number, and password');
    }

    const userExists = await userModel.findOne({ Email: email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const lastUser = await userModel.findOne({}, {}, { sort: { _id: -1 } }); // Find the last user
    const lastId = lastUser ? lastUser._id : 0; // Get the last _id or default to 0 if no user exists
    const newId = lastId + 1; // Increment the last _id
    const user = await userModel.create({
      _id: newId,
      Email: email,
      Password: hashedPassword,
      Username: username,
      PhoneNumber: phoneNumber,
      Salt: salt,
      RoleID: 4
    });

    const Client = await clientModel.create({
      _id: user._id,
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
      PhoneNumber: user.PhoneNumber,
      Salt: user.salt,
      RoleID: user.RoleID
    });

    await Client.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.Username,
        email: user.Email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data', error.message);
    }
  },

  loginUser: async (req, res) => {
    const { email, password, code } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await userModel.findOne({ Email: email }).select('+Password');
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      if (!user || !user.Password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      // Check if user.Password is defined and not null
      if (!user.Password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.Password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);

      res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 50 }).status(200).send('Logged in'); // 50 days

    //   res.status(200).json({
    //     _id: user._id,
    //     name: user.Username,
    //     email: user.Email,
    //     token: generateToken(user._id)
    //   });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // View user profile
  viewUserProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update user profile
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { newEmail, newUsername, newPhoneNumber } = req.body;

      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.Email = newEmail || user.Email;
      user.Username = newUsername || user.Username;
      user.PhoneNumber = newPhoneNumber || user.PhoneNumber;

      await user.save();

      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Reset password
  resetPassword: async (req, res) => {
    try {
      const userEmail = req.body.email;
      const password = req.body.password;
      const user = await userModel.findOne({ Email: userEmail });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(password, salt);
      user.Password = hash;
      user.salt = salt;

      await user.save();
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get QR Code
  getQRImage: async (req, res) => {
    try {
      const { id } = req.cookies;
      const user = await userModel.findById(req.user.userId);
      const uri = authenticator.keyuri(id, 'Help Desk', process.env.QRCODE_SECRET);
      const image = await qrcode.toDataURL(uri);
      user.temp_secret = process.env.QRCODE_SECRET;
      await user.save();
      return res.status(200).json({ image });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Set MFA get request
  setMFA: async (req, res) => {
    try {
      const { id } = req.cookies;
      const { code } = req.query;
      const user = await userModel.findById(req.user.userId);
      const temp_secret = user.temp_secret;

      const verified = authenticator.check(code, temp_secret);
      if (!verified) {
        return res.status(401).json({ message: 'Invalid Code' });
      }

      user.secret = temp_secret;
      user.MFA_Enabled = true;
      await user.save();
      return res.status(200).json({ message: 'MFA Enabled' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUserCustomization: async (req, res) => {
    try {
      const userId = req.params._id;
      const { theme, logoPath } = req.body;

      // Update or create customization settings for the user
      await Customization.findOneAndUpdate({ userId }, { $set: { theme, logoPath } }, { upsert: true, new: true });

      // Update the user's theme in the user model
      await userModel.findOneAndUpdate({ _id: userId }, { $set: { theme } }); // Update this line

      res.status(200).json({ message: 'Customization updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get user's ID
  getUser: async (req) => {
    // split from token= to the first . and get the second part
    // console.log(req.headers.cookie.split('token=')[1]);
    const token = req.headers.cookie.split('token=')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    let payload = null;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }

    const user = await userModel.findById(payload.id);
    // console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return user;
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = userController;
