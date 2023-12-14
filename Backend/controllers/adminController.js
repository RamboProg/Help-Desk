const userModel = require('../models/userModel');
const adminModel =require('../models/adminModel');
const managerModel = require('../models/managerModel');
const agentModel = require('../models/agentModel');
const clientModel = require('../models/clientModel');
require('dotenv').config();
const authenticator = require('otplib');
const bcrypt = require('bcryptjs');
const express = require('express');


const adminController = {
    AssignRole: async (req, res) => {
        try 
        {
        
        }catch(error){return res.status(401).json({message:error.message})}
        
       
    }

    }

module.exports = adminController;