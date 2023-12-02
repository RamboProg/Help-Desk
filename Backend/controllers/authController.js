const User = require('../models/userModel')
const jwt  = require("jsonwebtoken");
import authenticator from 'otplib';
import bcrypt from 'bcryptjs';
import qrcode from 'qrcode';
import crypto from 'crypto';

const authController = {
    // Login user
    loginUser: async (req, res) => {
    try {
        const { email, password, code } = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'email and password are required'})
        }



        //--------------------------------------------------------------------
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

    refresh: async (req, res) => {

    },

    logout: async (req, res) => {

    }
}

module.exports = {
   authController
}