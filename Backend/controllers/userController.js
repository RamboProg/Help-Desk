require('dotenv').config();
const jwt = require('jsonwebtoken');
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
const sessionModel = require("../models/sessionModel");
const { Types } = require('mongoose'); // Import the Types module from mongoose

const userController = {
  registerUser: async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    if (!username || !email || !password || !phoneNumber) {
      res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await userModel.findOne({ Email: email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
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
      res.status(400).json({ message: 'Invalid user data' });
    }
  },

  loginUser: async (req, res) => {
    const { email, password, code } = req.body;
        console.log(hiii);
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

      const currentDateTime = new Date();
      const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes

      const token = jwt.sign({ user: { userId: user._id, role: user.RoleID } }, process.env.JWT_SECRET, {
        expiresIn: 3 * 60 * 60 // 3 hours
      });

      console.log('Token:', token);


      let newSession = new sessionModel({
        userId: new Types.ObjectId(user._id),
        token,
        expiresAt: expiresAt 
      });
      await newSession.save();
      return res
        .cookie("token", token, {
          expires: expiresAt,
          withCredentials: true,
          httpOnly: false,
          SameSite:'none'
        })
        .status(200)
        .json({ message: "login successfully", user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


  // View user profile
  viewUserProfile: async (req, res) => {
    try {
      const _id = req.user.userId // Use req.user.id to get the user ID from the decoded token
      const user = await userModel.findById(_id);

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
      const userId = req.user.id; // Use req.user.id to get the user ID from the decoded token
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
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// const sendVerificationEmail = async ({_id,email},res) => {
//     const currentUrl ="http://localhost:3000/";
//     const uniqueString = uuidv4() + _id;
    
//     const mailOptions = {
//         from: process.env.MAIL_ADD,
//         to: email,
//         subject: "Verify your email",
//         text: "Please click the link below to verify your email",
//         html: `<a href="${currentUrl + "user/verify/"+ _id + "/" + uniqueString}>Verify</a>`,
//     };
//     //hash the unique string
//     const saltRounds =10;
//     bcrypt
//     .hash(uniqueString,saltRounds)
//     .then((hashedUniqueString) => {
//         //set values in userVerification collection
//         const newVerification = new userVerification({
//             userId: _id,
//             uniqueString: hashedUniqueString,
//             createdAt: Date.now(),
//             expiresAt: Date.now() + 1 * 60 * 60 * 1000, //expires in 1 hour
//     })
//     newVerification.save()
//     .then(()=>{
//         transporter.sendMail(mailOptions).then(()=>{

//             res.json({status:"Pending",message:"Verification email sent successfully"});
//         })
    
//     })
//     .catch((error) => {
//         res.json({message:"Error saving verification details"});
//     })
//     .catch(()=>{
//         res.json({message:"Error hashing unique string"});
//     });
// });
// };


module.exports = { userController };
