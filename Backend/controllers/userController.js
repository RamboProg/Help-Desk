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
const nodemailer = require("nodemailer");
//const userVerification = require('../models/userVerification.js');
// const {v4: uuidv4} = require('uuid');
const { error } = require('console');
const OTP = require('../models/otpModel.js');

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
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ADD,
        pass: process.env.MAIL_PASS,
    },
});
const userController = {
     registerUser: async (req, res) => {
        const { username, email, password , phoneNumber} = req.body;
      
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
            RoleID: 4,
            is_valid:true, 
        });

        const Client = await clientModel.create({
            _id: user._id,
            Email: user.Email,
            Password: user.Password,
            Username: user.Username,
            PhoneNumber: user.PhoneNumber,
            Salt: user.salt,
            RoleID: user.RoleID,
            is_valid:true, 
        });
        
        await Client.save();

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.Username,
            email: user.Email,
            token: generateToken(user._id),
          });
        } else {
          res.status(400);
          throw new Error('Invalid user data' , error.message );
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

      res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 50 }); // 50 days
        // Return the Role_ID along with the token
        res.status(200).json({
          message: 'Logged in',
          Role_ID: user.RoleID, // Return the Role_ID
        });

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


    // View user profile
    viewUserProfile: async (req, res) => {
        try {
            const userId = req.user.id; // Use req.user.id to get the user ID from the decoded token
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
            const userId = req.user.id; // Use req.user.id to get the user ID from the decoded token
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

            const salt = await bcrypt.genSalt(10); const hash = bcrypt.hashSync(password, salt);
            user.Password = hash;
            user.salt = salt;

            await user.save();
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Set MFA get request
    setMFA: async (req, res) => {
        try {
            const {id} = req.body;
            const user = await userModel.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if(user.MFA_Enabled === false){
            await userModel.updateOne({ _id: id }, { $set: { MFA_Enabled: true } });
            }else{
            await userModel.updateOne({_id:id},{$set :{MFA_Enabled:false} });
            }
            console.log("Email sent successfully");
            console.log("hi");

            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    logoutUser: async (req, res) => {
        try {
            // Clear the JWT cookie
            res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
            await userModel.updateOne({ _id: req.user.id }, { $set: { verified: false } });
            res.status(200).json({ success: true, message: 'Logout successful' });
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

    getUser: async (req,res) => {
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
  },
  getMFA: async (req, res) => {
    const {email}  = req.query;
    try {
      
      console.log(email);
      console.log("Received email:", email); // Add this line for debugging
      const user = await userModel.findOne({ Email: email });
      console.log(user);
      console.log(2);
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User found. MFA Enabled:", user.MFA_Enabled);
      return res.status(200).json(user.MFA_Enabled);
    } catch (error) {
      console.error("Error in getMFA:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },
  
   
  sendOTP : async (req, res) => {
        try {
            // const cookies = req.cookies;
            // const token = cookies.jwt;

            // // Check if the token is available
            // if (!token) {
            //     return res.status(401).json({ message: 'Unauthorized' });
            // }

            // // Verify the JWT token
            // const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // // Get user from the token
            // const user = await userModel.findById(decoded.id);

            // if (!user) {
            //     return res.status(404).json({ message: 'User not found' });
            // }
            const {email} = (req.body);
            // const cookies =req.cookies;
            // const token = cookies.jwt;
            // if(token){
            //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //     const user = await userModel.findById(decoded.id);
            //     if (!user) {
            //         return res.status(404).json({ message: 'User not found' });
            //     }

            // }
            await deleteOTP(email);
            const OneTimePass = await (Math.floor(100000 + Math.random() * 900000)).toString();
            const hashedOTP = await bcrypt.hash(OneTimePass, 10);
            const newOTP = new OTP({
                email: email,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiredAt: Date.now() + 1 * 60 * 1000,
            });

            var mailOptions = {
                from: process.env.MAIL_ADD,
                to: email,
                subject: 'Verify your email',
                text: 'Please click the link below to enable Multi-factor authentication',
                html: `<p>${OneTimePass}</p>`,
            };

            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
            await newOTP.save();
            res.status(200).json({ message: 'Multi-factor authentication email sent successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    verifyOTP: async (req, res) => {
      try {
        const { email, code } = req.body;
        console.log(email, code);
    
        const user = await userModel.findOne({ Email: email });
        const validOTP = await verifyOTP(email, code);
        if (!validOTP) {
          throw new Error("Invalid OTP");
        }
    
        await deleteOTP(email);
        if (user) {
          
          await userModel.updateOne({ Email: email }, { verified: true });
          
        }
        return res.status(200).json({ message: "Multi-factor authentication email sent successfully" });
    
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
    // getUser: async (req,res) => {
    //     // split from token= to the first . and get the second part
    //     // console.log(req.headers.cookie.split('token=')[1]);
    //     const token = req.headers.cookie.split('token=')[1];
    
    //     if (!token) {
    //       return res.status(401).json({ message: 'No token, authorization denied' });
    //     }
    
    //     let payload = null;
    
    //     try {
    //         payload = jwt.verify(token, process.env.JWT_SECRET);
    //     } catch (err) {
    //         return res.status(401).json({ message: 'Token is not valid' });
    //     }
    
    //     const user = await userModel.findById(payload.id);
    //     // console.log(user)
    
    //     if (!user) {
    //       return res.status(404).json({ message: 'User not found' });
    //     }
    
    //     return user;
    //   }
    
  // verifyOTPforLogin: async (req, res) => {
  //   try {
  //     const { email,code } = req.body;
  //     console.log(email,code);
  //     const validOTP = await verifyOTP(email,code);
      
  //       if(!validOTP){
  //           throw Error("Invalid OTP")
  //       }
  //       await userModel.updateOne({Email:email},{verified:true});
  //       await deleteOTP(email);
        
  //     res.status(200).json({ message: 'Multi-factor authentication email sent successfully' });
  //   }catch (error) {
  //       res.status(500).json({ message: error.message });
  //   } 
  // },


};
const verifyOTP = async (email,otp) => {
    try {
        if(!email || !otp){
            throw Error("Provide values for Email and/or OTP")
        }
        console.log(5);
        const matchedOTPRecord = await OTP.findOne({email:email});
        console.log(6);
        if(!matchedOTPRecord){
            throw Error("Invalid OTP")
        }
        console.log(7);
        const {expiresAt} = matchedOTPRecord;
        console.log(8);
        if( expiresAt < Date.now()){
          console.log(9);
            await OTP.deleteOne({email:email});
            console.log(10);
            throw Error("OTP expired, request a new one.")
        }
        const hashedOTP = matchedOTPRecord.otp;
        console.log(11);
        const validOTP = await bcrypt.compare(otp,hashedOTP);
        console.log(12);
        return validOTP;
    } catch (error) {
        throw error;
    }
};
const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({email:email});
    } catch (error) {
        throw error;
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
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


module.exports = userController;