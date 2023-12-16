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
async function generateSalt() {
    return bcrypt.genSalt(10); // 10 is the number of rounds for the salt generation
  }
  async function hashPassword(password, salt) {
    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  } 

const authentication = require('../middleware/authenticationMiddleware');
 // Function to get user based on role
 async function getUser(req, res) {
    try {
        const Token = req.header('Authorization');
        const decoded = jwt.verify(Token, process.env.SECRET_KEY);

    } catch (error) {
        console.error('Error could not get user', error);
        throw error;
    }
}

const userController = {
    // Login user
    // loginUser: async (req, res) => {
    //     try {
    //         const { email, password, code } = req.body;

    //         // Find the user by email
    //         const user = await userModel.findOne({ Email: email });

    //         if (!user) {
    //             return res.status(401).json({ message: "Invalid credentials" });
    //         }

    //         const salt = user.Salt;
    //         const hash = bcrypt.hashSync(password, salt);
    //         const isPasswordValid = bcrypt.compareSync(hash, user.Password);

    //         if (!isPasswordValid) {
    //             return res.status(401).json({ message: "Invalid credentials" });
    //         }

    //         if (!user.MFA_Enabled) {
    //             const token = jwt.sign({ userId: user._id }, securityKey, { expiresIn: '1h' });
    //             return res.status(200).json({ token });
    //         }

    //         const verified = authenticator.check(code, user.secret);
    //         if (!verified) {
    //             return res.status(401).json({ message: "Invalid Code" });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },
    Register: async (req, res) => {
        try {
            const { email, password, username, phoneNumber } = req.body;

            // Check if user already exists
            const userExists = await userModel.findOne({ Email: email });
            if (userExists) {
                res.status(400).json({ message: "User already exists" });
            } else {
                const salt = await generateSalt();
                const hash = await hashPassword(password, salt);
                // Create a new user with roles
                const user = await userModel.create({
                    Email: email,
                    Password: hash,
                    Username: username,
                    PhoneNumber: phoneNumber,
                    Salt: salt,
                    Roles: 4, // Assuming Roles is an array field in your userModel
                });
                res.status(201).json(user);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    

    // View user profile
    viewUserProfile: async (req, res) => {
        try {
            const userId = req.user.userId;
            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
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
                return res.status(404).json({ message: "User not found" });
            }

            user.Email = newEmail || user.Email;
            user.Username = newUsername || user.Username;
            user.PhoneNumber = newPhoneNumber || user.PhoneNumber;

            await user.save();

            res.status(200).json({ message: "Profile updated successfully", user });
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
                return res.status(404).json({ message: "User not found" });
            }

            const salt = await generateSalt();
            const hash = bcrypt.hashSync(password, salt);
            user.Password = hash;
            user.Salt = salt;

            await user.save();
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get QR Code
    getQRImage: async (req, res) => {
        try {
            const { id } = req.cookies;
            const user = await userModel.findById(req.user.userId);
            const uri = authenticator.keyuri(id, "Help Desk", process.env.QRCODE_SECRET);
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
                return res.status(401).json({ message: "Invalid Code" });
            }

            user.secret = temp_secret;
            user.MFA_Enabled = true;
            await user.save();
            return res.status(200).json({ message: "MFA Enabled" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateUserCustomization: async (req, res) => {
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
            await userModel.findOneAndUpdate({ _id: userId }, { $set: { theme } }); // Update this line
      
            res.status(200).json({ message: 'Customization updated successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
          }
    },
};



// module.exports = { userController, getUser };
module.exports = userController;

// async function getUser(userId) {
//     const User = require('./models/userModel');
//     const Admin = require('./models/adminModel');
//     const Manager = require('./models/managerModel');
//     const Agent = require('./models/agentModel');
//     const Client = require('./models/clientModel');
//     try {
//       const user = await User.findById({ _id: userId }); //assuming all users of different role types are also saved in the users table

//       switch (user.RoleID) {
//         case 1:
//           return await Admin.findById(userId);
//         case 2:
//           return await Manager.findById(userId);
//         case 3:
//           return await Agent.findById(userId);
//         case 4:
//           return await Client.findById(userId);
//         default:
//           return null; // user is not in tables
//       }

//     } catch (error) {
//       console.error('Error could not get user', error)
//       throw error;
//     }
//   }