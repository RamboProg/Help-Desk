const userModel = require('../models/userModel');
const adminModel =require('../models/adminModel');
const managerModel = require('../models/managerModel');
const agentModel = require('../models/agentModel');
const clientModel = require('../models/clientModel');
require('dotenv').config();
const authenticator = require('otplib');
const bcrypt = require('bcryptjs');
const express = require('express');
const Notifications = require('../models/notificationModel');


const adminController = {
    AssignRole: async (req, res) => {
        try 
        {
            const {userID, roleID} = req.body;
            const user = await userModel.findOne({ _id: userID });
            if (!user) {
                return res.status(401).json({ message: "User not Found"});
            }
            // To delete a non-admin user
            let oldRole;
            switch (user.RoleID)
            {
                case 2: 
                    oldRole = await managerModel.findOne({ _id: userID });
                    break;
                case 3:
                    oldRole = await agentModel.findOne({ _id: userID });
                    break;
                case 4:
                    oldRole = await clientModel.findOne({ _id: userID });
                    break;
                default: 
                    return res.status(401).json({ message: "Invalid Role"});
            }
            if (!oldRole) {
                return res.status(401).json({ message: "User not Found"});
            }
            await oldRole.deleteOne();
            // To assign a new role
            let newRole;
            switch(roleID)
            {
                case 2: 
                    newRole = await managerModel;
                    break;
                case 3:
                    newRole = await agentModel;
                    break;
                case 4:
                    newRole = await clientModel;
                    break;
                default: 
                    return res.status(401).json({ message: "Invalid Role"});
            }
            if (!newRole) {
                return res.status(401).json({ message: "User not Found"});
            }
            const newUser =await newRole.create({
                _id: userID,
                Email: user.Email,
                Password: user.Password,
                Username: user.Username,
                PhoneNumber: user.PhoneNumber,
                RoleID: roleID,
                MFA_Enabled: user.MFA_Enabled,
                Is_EnabledL: user.Is_Enabled,
                Salt: user.Salt,
             });
             await userModel.updateOne({_id: userID}, {RoleID: roleID});
             return res.status(200).json({message: "Role Assigned Successfully"});

        }catch(error){return res.status(401).json({message:error.message})}
        
       
    },

    getUsers: async (req, res) => {
        try {
            const users = await userModel.find({ RoleID: { $ne: 1 }}, 'Email Username PhoneNumber RoleID');

            return res.status(200).json({ users });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },
    getMyNotications: async (req, res) => {
        try {
            const { userID } = req.query; 
            const notifications = await Notifications.find({ Receiver: userID });
            if (!notifications) {
                return res.status(401).json({ message: "No Notifications Found"});
            }
            return res.status(200).json({ notifications });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },
};
module.exports = adminController;
