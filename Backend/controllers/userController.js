async function getUser(userId) {
    const User = require('./models/userModel');
    const Admin = require('./models/adminModel');
    const Manager = require('./models/managerModel');
    const Agent = require('./models/agentModel');
    const Client = require('./models/clientModel');
    try {
      const user = await User.findById({ _id: userId }); //assuming all users of different role types are also saved in the users table
  
      switch (user.RoleID) {
        case 1:
          return await Admin.findById(userId);
        case 2:S
          return await Manager.findById(userId);
        case 3:
          return await Agent.findById(userId);
        case 4:
          return await Client.findById(userId);
        default:
          return null; // user is not in tables
      }
  
    } catch (error) {
      console.error('Error could not get user', error)
      throw error;
    }
  }
  