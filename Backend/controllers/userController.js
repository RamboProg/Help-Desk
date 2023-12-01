import User from '../models/userModel.js';

<<<<<<< HEAD
const authenticator = require('otplib');
const securityKey = authenticator.generateSecret();
const bcrypt = require('bcryptjs');
const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const Crypto = require('crypto');
function generateSalt() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(256, (err, buf) => {
        if (err) {
          reject(err);
        } else {
          resolve(buf);
        }
      });
    });
  }
=======
export const userController = {
  getUser: async (req, res) => {
    const User = require('./models/userModel');
    const Admin = require('./models/adminModel');
    const Manager = require('./models/managerModel');
    const Agent = require('./models/agentModel');
    const Client = require('./models/clientModel');
>>>>>>> 842a9ac77024a92a5f5c4d60f3c6653124dec6eb

    const userId = req.params.userId;

    try {
      //assuming all users of different role types are also saved in the users table
      const user = await User.findById({ _id: userId });

<<<<<<< HEAD
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const salt = user.Salt;

            const hash = bcrypt.hashSync(password, salt);

            const isPasswordValid = bcrypt.compareSync(hash, user.Password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            if (!user.MFA_Enabled) {
                const token = jwt.sign({ userId: user._id }, securityKey, { expiresIn: '1h' });
                return res.status(200).json({ token });
            }

            const verified = authenticator.check(code, user.secret);
            if (!verified) {
                return res.status(401).json({ message: "Invalid Code" });
            }

            res.status(200).json({ token });
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

            const salt = await generateSalt(); // Use await to get the result from the promise
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
            const uri = authenticator.keyuri(id, "Help Desk", securityKey);
            const image = await qrcode.toDataURL(uri);
            user.temp_secret = securityKey;
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
            const user = await userModel.findById(req.user.userId); // Fetch user from the database
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
    }
};

// Move the generateSalt function outside the userController object
async function generateSalt() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(256, (err, buf) => {
            if (err) {
                reject(err);
            } else {
                resolve(buf);
            }
        });
    });
}

module.exports = userController;
=======
      switch (user.RoleID) {
        case 1:
          return await Admin.findById(userId);
        case 2:
          return await Manager.findById(userId);
        case 3:
          return await Agent.findById(userId);
        case 4:
          return await Client.findById(userId);
        default:
          return null; // user is not in tables
      }
    } catch (error) {
      console.error('Error could not get user', error);
      throw error;
    }
  }
};

// async function getUser(userId) {
//     const User = require('./models/userModel');
//     const Admin = require('./models/adminModel');
//     const Manager = require('./models/managerModel');
//     const Agent = require('./models/agentModel');
//     const Client = require('./models/clientModel');
//     try {
//       const user = await User.findById({ _id: userId }); //assuming all users of different role types are also saved in the users table
>>>>>>> 842a9ac77024a92a5f5c4d60f3c6653124dec6eb

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
