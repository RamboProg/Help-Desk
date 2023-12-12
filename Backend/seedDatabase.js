const mongoose = require('mongoose');
require('dotenv').config();
const UserModel = require('./models/userModel.js');
const AdminModel = require('./models/adminModel.js');
const SupportAgentModel = require('./models/agentModel.js');
const ClientModel = require('./models/clientModel.js');
const FAQModel = require('./models/FAQModel.js');
const IssueModel = require('./models/issueModel.js');
const LogModel = require('./models/logsModel.js');
const ManagerModel = require('./models/managerModel.js');
const TicketModel = require('./models/ticketModel.js');
const ChatModel = require('./models/chatModel.js');


mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const seedData = async () => {
  try {
    // Clear existing data
    await UserModel.deleteMany({});
    await AdminModel.deleteMany({});
    await SupportAgentModel.deleteMany({});
    await ClientModel.deleteMany({});
    await FAQModel.deleteMany({});
    await IssueModel.deleteMany({});
    await LogModel.deleteMany({});
    await ManagerModel.deleteMany({});
    await TicketModel.deleteMany({});
    await ChatModel.deleteMany({});

    // Seed issue data
    const issueTypes = [
      { Issue: 'Software', Sub_Issue_Type: ['Operating system', 'Application software', 'Custom software', 'Integration issues'] },
      { Issue: 'Hardware', Sub_Issue_Type: ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'] },
      { Issue: 'Network', Sub_Issue_Type: ['Email issues', 'Internet connection problems', 'Website errors'] },
    ];

    const issuesData = await Promise.all(issueTypes.map((issue) => new IssueModel(issue).save()));

    // Seed user data
    const users = [];
    for (let i = 0; i < 30; i++) {
      const randomRoleID = i % 4 + 1; // Alternating role IDs
      const user = new UserModel({
        _id: i + 1,
        Email: `user${i + 1}@example.com`,
        Password: 'password123',
        Username: `user${i + 1}`,
        PhoneNumber: '123-456-7890',
        RoleID: randomRoleID,
        MFA_Enabled: i % 2 === 0, // Every other user has MFA enabled
        Is_Enabled: true,
        theme: 'light', // Default theme is light
        logoPath: 'https://placekitten.com/200/200', // Placeholder image
        salt: 'somesaltvalue',
      });

      // Save user data based on role ID
      switch (user.RoleID) {
        case 1: // Admin
          await new AdminModel({
            _id: user._id,
            Email: user.Email,
            Password: user.Password,
            Username: user.Username,
            PhoneNumber: user.PhoneNumber,
            RoleID: user.RoleID,
            MFA_Enabled: user.MFA_Enabled,
            Is_Enabled: user.Is_Enabled,
            Salt: user.salt,
          }).save();
          break;
        case 2: // Manager
          await new ManagerModel({
            _id: user._id,
            Email: user.Email,
            Password: user.Password,
            Username: user.Username,
            PhoneNumber: user.PhoneNumber,
            RoleID: user.RoleID,
            MFA_Enabled: user.MFA_Enabled,
            Is_Enabled: user.Is_Enabled,
            Salt: user.salt,
          }).save();
          break;
        case 3: // Support Agent
          await new SupportAgentModel({
            _id: user._id,
            Email: user.Email,
            Password: user.Password,
            Username: user.Username,
            PhoneNumber: user.PhoneNumber,
            RoleID: user.RoleID,
            MFA_Enabled: user.MFA_Enabled,
            Is_Enabled: user.Is_Enabled,
            Pref_Type: 'email', // Default preference type
            Average_Rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
            Ticket_Count: Math.floor(Math.random() * 10), // Random ticket count
            Active_Tickets: Math.floor(Math.random() * 5), // Random active ticket count
            Salt: user.salt,
          }).save();
          break;
        case 4: // Client
          await new ClientModel({
            _id: user._id,
            Email: user.Email,
            Password: user.Password,
            Username: user.Username,
            PhoneNumber: user.PhoneNumber,
            RoleID: user.RoleID,
            MFA_Enabled: user.MFA_Enabled,
            Is_Enabled: user.Is_Enabled,
            Salt: user.salt,
          }).save();
          break;
        default:
          break;
      }
    }

    // Seed FAQ data
    const faqs = [];
    for (let i = 0; i < 5; i++) {
      const faq = new FAQModel({
        Question: `Question ${i + 1}`,
        Answer: `Answer ${i + 1}`,
        Category: `Category ${i + 1}`,
        Sub_Category: `Sub-Category ${i + 1}`,
      });
      faqs.push(faq.save());
    }

    // Seed log data
    const logs = [];
    for (let i = 0; i < 5; i++) {
      const log = new LogModel({
        level: 'info', // Default log level
        message: `Log message ${i + 1}`,
        meta: { key: `key${i + 1}`, value: `value${i + 1}` },
      });
      logs.push(log.save());
    }

    // Seed ticket data
    const tickets = [];
    for (let i = 0; i < 5; i++) {
      const ticket = new TicketModel({
        _id: i + 1,
        Status: 'Open', // Default ticket status
        Assigned_AgentID: i % 5 + 1, // Assign tickets to agents in a loop
        Ticket_Owner: (i % 10) + 1, // Assign tickets to users in a loop
        Issue_Type: issuesData[i % 3].Issue, // Assign issues in a loop
        Description: `Ticket description ${i + 1}`,
        Priority: i % 3 === 0 ? 'High' : 'Low', // Alternate priority
        Resolution_Details: `Resolution details ${i + 1}`,
        Start_Date: new Date(), // Current date as the start date
        End_Date: new Date(), // Current date as the end date
        Sub_Issue_Type: issuesData[i % 3].Sub_Issue_Type[i % 4], // Assign sub-issue types in a loop
      });
      tickets.push(ticket.save());
    }

    // Seed chat data
    const chats = [];
    for (let i = 0; i < 5; i++) {
      const chat = new ChatModel({
        _id: i + 1,
        Client_ID: (i % 10) + 1, // Assign clients in a loop
        Support_AgentID: i % 5 + 1, // Assign support agents in a loop
        Messages: `Chat message ${i + 1}`,
        Start_Time: new Date(), // Current date as the start time
        End_Time: new Date(), // Current date as the end time
        Message_Count: i + 1, // Increment message count
        TicketID: (i % 5) + 1, // Assign tickets in a loop
      });
      chats.push(chat.save());
    }

    await Promise.all([...users, ...faqs, ...issuesData, ...logs, ...tickets, ...chats]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

seedData();