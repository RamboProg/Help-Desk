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
            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "Username": foundUser.Username,
                        "RoleID": foundUser.RoleID,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'} //make it 15 min after deployement it's 10s for testing purposes
            )
    
            const refreshToken = jwt.sign(
                {"Username": foundUser.Username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'} //make time shorter while testing
            )
    
            //create secure cookie with refresh token
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 *60 * 60 * 1000
            })
    
            return res.status(200).json({ accessToken });
        }

        const verified = authenticator.check(code, user.secret);
        if (!verified) {
            return res.status(401).json({ message: "Invalid Code" });
        }

        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "Username": foundUser.Username,
                    "RoleID": foundUser.RoleID,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        )

        const refreshToken = jwt.sign(
            {"Username": foundUser.Username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        //create secure cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 *60 * 60 * 1000
        })

        return res.status(200).json({ accessToken });
       

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

refresh: async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const foundUser = await User.findOne({ Username: decoded.Username });
        if(!foundUser) return res.status(401).json({message: 'Unauthorized'})
        
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "Username": foundUser.Username,
                    "RoleID": foundUser.RoleID,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '10s'}
        )



        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    }
},


    logout: async (req, res) => {

    }
}

module.exports = {
   authController
}