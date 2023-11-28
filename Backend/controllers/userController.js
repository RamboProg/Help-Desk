const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const securityKey = "S12k4r4,.;lp";
const bcrypt = require('bcryptjs');

const userController = {
    // Register user
    registerUser: async (req, res) => {
        try {
            const { email, password, username, phoneNumber } = req.body;

            const userExists = await userModel.findOne({ Email: email });
            if (userExists) {
                res.status(400).json({ message: "User already exists" });
            } else {
                const salt = generateSalt();
                const hash = bcrypt.hashSync(password, salt);
                const user = await userModel.create({
                    Email: email,
                    Password: hash,
                    Username: username,
                    PhoneNumber: phoneNumber,
                    Salt: salt,
                });
                res.status(201).json(user);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Login user
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const user = await userModel.findOne({ Email: email });

            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const salt = user.Salt;

            const hash = bcrypt.hashSync(password, salt);

            const isPasswordValid = bcrypt.compareSync(hash, user.Password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user._id }, securityKey, { expiresIn: '1h' });

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
    //Reset password
    resetPassword: async (req, res) => {
        try {
            const userEmail = req.body.email;
            const password = req.body.password;
            const user = await userModel.findOne({ Email: userEmail });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const salt = generateSalt();
            const hash = bcrypt.hashSync(password, salt);
            user.Password = hash;
            user.Salt = salt;

            await user.save();
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

function generateSalt() {
    //return Math.round((new Date().valueOf() * Math.random())) + '';
    Crypto.randomBytes('256', function (err, buf) {
        if (err) throw err;
        return buf;
    });
}

module.exports = userController;

// Path: Backend/controllers/userController.js