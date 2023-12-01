const userModel = require('../models/userModel');
require('dotenv').config();
const authenticator = require('otplib');
const bcrypt = require('bcryptjs');
const express = require('express');


const userController = {
    createNewUser: async (req, res) => {
        try {
            const { email, password, username, phoneNumber, role } = req.body;

            // Check if user already exists
            const userExists = await userModel.findOne({ Email: email });
            if (userExists) {
                res.status(400).json({ message: "User already exists" });
            } else {
                const salt = generateSalt();
                const hash = bcrypt.hashSync(password, salt);
                // Create a new user with roles
                const user = await userModel.create({
                    Email: email,
                    Password: hash,
                    Username: username,
                    PhoneNumber: phoneNumber,
                    Salt: salt,
                    Roles: [role], // Assuming Roles is an array field in your userModel
                });
                res.status(201).json(user);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
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