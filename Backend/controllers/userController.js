const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const securityKey = "S12k4r4,.;lp";
const bcrypt = require('bcryptjs');

function generateSalt() {
    //return Math.round((new Date().valueOf() * Math.random())) + '';
    Crypto.randomBytes('256', function (err, buf) {
        if (err) throw err;
        return buf;
    });
}

const userController = {
    registerUser: async (req, res) => {
        try {
            const { email, password, username, phoneNumber } = req.body;

            // Check if user already exists
            const userExists = await userModel.findOne({ Email: email });
            if (userExists) {
                res.status(400).json({ message: "User already exists" });
            } else {
                const salt = generateSalt();
                const hash = bcrypt.hashSync(password, salt);
                // Create a new user
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
    }
    ,

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const user = await userModel.findOne({ Email: email });

            // Check if the user exists
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            //get the salt
            const salt = user.Salt;

            // Hash the password
            const hash = bcrypt.hashSync(password, salt);

            // Verify the password
            const isPasswordValid = bcrypt.compareSync(hash, user.Password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Password is valid, create a JWT token
            const token = jwt.sign({ userId: user._id }, securityKey, { expiresIn: '1h' });

            // Send the token to the client
            res.status(200).json({ token });

        } catch (error) {

        }
    }
}

module.exports = userController;