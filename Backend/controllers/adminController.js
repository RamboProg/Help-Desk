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
            const {userid,roleID}  = req.body;
            const user = await userModel.findOne({ _id: userid });
            if(!user)
            {
                return res.status(401).json({ message: "Invalid User" });
            }

            // const  GeneralModel = (()=>{
            //     switch(roleID){
            //     case  2:
            //         const manager = managerModel.findById(userid);
            //         managerModel.deleteOne({ _id: userid }); 
            //         return manager;
            //     case  3:
            //         const agent = agentModel.findById(userid);
            //         agentModel.deleteOne({ _id: userid });
            //     return agent;
            //     case 4:
            //         const client = clientModel.findById({_id:userid});
            //         clientModel.deleteOne({ _id: userid });
            //     return client;
            // }})
            //const updatedRole = await userModel.updateOne({ _id: userid }, { RoleID: roleID });
            // const new_id = GeneralModel._id;

        if(user.RoleID==4){
            await clientModel.deleteOne({userid});
            if(roleID==1){
                try
                {    
                    const newAdmin = await adminModel.create({
                        _id: userid,
                        Email: user.Email,
                        password: user.Password,
                        Username: user.Username,
                        PhoneNumber: user.PhoneNumber,
                        RoleID: roleID,
                        MFA_Enabled: user.MFA_Enabled,
                        Is_Enabled: user.Is_Enabled,
                        Salt: user.salt
                    })
                    return res.status(200).json({ message: "Admin Role Assigned" });
                }catch(error){
                    return res.status(401).json({message:error.message});
                }
            }else if(roleID==2){
                try{
                    const newManager = await managerModel.create({
                        _id: userid,
                        Email: user.Email,
                        Password: user.Password,
                        Username: user.Username,
                        PhoneNumber: user.PhoneNumber,
                        RoleID: roleID,
                        MFA_Enabled: user.MFA_Enabled,
                        Is_Enabled: user.Is_Enabled,
                        Salt: user.salt
                    })
                    return res.status(200).json({ message: "Manager Role Assigned" });
                }catch(error){
                    return res.status(401).json({message: error.message});
                }
            }else if (roleID==3){
                try{    
                    const newAgent = await agentModel.create({
                        _id: userid,
                        Email: user.Email,
                        Password: user.Password,
                        Username: user.Username,
                        PhoneNumber: user.PhoneNumber,
                        RoleID: roleID,
                        MFA_Enabled: user.MFA_Enabled,
                        Is_Enabled: user.Is_Enabled,
                        Salt: user.salt
                    })
                    return res.status(200).json({ message: "Agent Role Assigned" });
                } catch (error) {
                    return res.status(401).json({ message: error.message });
                }
            }
        }else if (user.roleID==2){
            await managerModel.deleteOne({userid});
            try{
                if(roleID==1){
                    try
                    {    
                        const newAdmin = await adminModel.create({
                            _id: userid,
                            Email: user.Email,
                            password: user.Password,
                            Username: user.Username,
                            PhoneNumber: user.PhoneNumber,
                            RoleID: roleID,
                            MFA_Enabled: user.MFA_Enabled,
                            Is_Enabled: user.Is_Enabled,
                            Salt: user.salt
                        })
                        return res.status(200).json({ message: "Admin Role Assigned" });
                    }catch(error){
                        return res.status(401).json({message:error.message});
                    }
                }else if(roleID==4){
                    try{
                        const newclient = await clientModel.create({
                            _id: userid,
                            Email: user.Email,
                            Password: user.Password,
                            Username: user.Username,
                            PhoneNumber: user.PhoneNumber,
                            RoleID: roleID,
                            MFA_Enabled: user.MFA_Enabled,
                            Is_Enabled: user.Is_Enabled,
                            Salt: user.salt
                        })
                        return res.status(200).json({ message: "Manager Role Assigned" });
                    }catch(error){
                        return res.status(401).json({message: error.message});
                    }
                }else if (roleID==3){
                    try{    
                        const newAgent = await agentModel.create({
                            _id: userid,
                            Email: user.Email,
                            Password: user.Password,
                            Username: user.Username,
                            PhoneNumber: user.PhoneNumber,
                            RoleID: roleID,
                            MFA_Enabled: user.MFA_Enabled,
                            Is_Enabled: user.Is_Enabled,
                            Salt: user.salt
                        })
                        return res.status(200).json({ message: "Agent Role Assigned" });
                    } catch (error) {
                        return res.status(401).json({ message: error.message });
                    }
                }

            }catch(error){return res.status(401).json({message:error.message})}
        }else if (user.roleID==3){
            await agentModel.deleteOne({userid});
            if(roleID==1){
                try
                {    
                    const newAdmin = await adminModel.create({
                        _id: userid,
                        Email: user.Email,
                        password: user.Password,
                        Username: user.Username,
                        PhoneNumber: user.PhoneNumber,
                        RoleID: roleID,
                        MFA_Enabled: user.MFA_Enabled,
                        Is_Enabled: user.Is_Enabled,
                        Salt: user.salt
                    })
                    return res.status(200).json({ message: "Admin Role Assigned" });
                }catch(error){
                    return res.status(401).json({message:error.message});
                }
            }else if(roleID==4){
                try{
                    const newclient = await clientModel.create({
                        _id: userid,
                        Email: user.Email,
                        Password: user.Password,
                        Username: user.Username,
                        PhoneNumber: user.PhoneNumber,
                        RoleID: roleID,
                        MFA_Enabled: user.MFA_Enabled,
                        Is_Enabled: user.Is_Enabled,
                        Salt: user.salt
                    })
                    return res.status(200).json({ message: "Manager Role Assigned" });
                }catch(error){
                    return res.status(401).json({message: error.message});
                }
            }else if (roleID==2){
                try{    
                    const newManager = await managerModel.create({
                        _id: userid,
                        Email: user.Email,
                        Password: user.Password,
                        Username: user.Username,
                        PhoneNumber: user.PhoneNumber,
                        RoleID: roleID,
                        MFA_Enabled: user.MFA_Enabled,
                        Is_Enabled: user.Is_Enabled,
                        Salt: user.salt
                    })
                    return res.status(200).json({ message: "Agent Role Assigned" });
                } catch (error) {
                    return res.status(401).json({ message: error.message });
                }
            }
        }
        }catch(error){return res.status(401).json({message:error.message})}
        
       
    }

    }

module.exports = adminController;