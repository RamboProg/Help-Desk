const mongoose = require('mongoose');
const Client = require('../models/clientModel');
const Ticket = require('../models/ticketModel');
const Agent = require('../models/agentModel');
const Chat = require('../models/chatModel');
const { getUser } = require('../controllers/userController');
 const clientController = {

  getMyTickets: async (req, res) => {
    try {
      const clientid = req.user.userId;
      const client = await Client.findById(clientid);

      if (!client) {
        return res.status(404).json({ error: 'Client not found!' });
      }

      const tickets = await Ticket.find({ Ticket_Owner: userId });

      res.json(tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createTicket: async (req, res) => {
    try {
      const userId = req.user.userId;
      console.log(userId);
      const client = await Client.findById(userId);      // check if the client exists
      if (!client) {
        return res.status(404).json({ error: 'client not found' });
      }
      //getting current date for start date
      const currentDate = new Date();
      //checking to see if the subissue type is allowed or not
      const allowedIssueTypes = ['Network', 'Software', 'Hardware'];
      const requestedIssueType = req.body.Issue_Type;

      if (!allowedIssueTypes.includes(requestedIssueType)) {
        return res.status(400).json({ error: 'Invalid Sub_Issue_Type. Allowed values are: Network, Software, Hardware.' });
      }
      // setting the priority of the sub issue type and checking to see if the sub issue type is valid
      let validSubIssueTypes; //used for populating the drop down later on
      const highPriority = ['Servers', 'Networking equipment', 'Operating system', 'Integration issues', 'Email issues'];
      const mediumPriority = ['Laptops', 'Desktops', 'Application software', 'Website errors'];
      switch (requestedIssueType) {
        case 'Hardware':
          validSubIssueTypes = ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment', 'other'];
          break;
        case 'Software':
          validSubIssueTypes = ['Operating system', 'Application software', 'Custom software', 'Integration issues', 'other'];
          break;
        case 'Network':
          validSubIssueTypes = ['Email issues', 'Internet connection problems', 'Website errors', 'other'];
          break;
        default:
          validSubIssueTypes = [];

          if (!validSubIssueTypes.includes(req.body.Sub_Issue_Type)) {
            return res.status(400).json({ error: 'Invalid Sub issue Type' });
          }
      }
      let priority; //setting the priority based on the sub issue type 
      const requestedSubIssueType = req.body.Sub_Issue_Type;
      if (highPriority.includes(requestedSubIssueType)) {
        priority = 'high';
      } else if (mediumPriority.includes(requestedSubIssueType)) {
        priority = 'medium';
      } else {
        priority = 'low';
      }

      const newTicket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        Status: 'Open',
        Assigned_AgentID: null, //needs a function
        Ticket_Owner: userId,
        Issue_Type: req.body.Issue_Type,
        Description: req.body.description,
        Priority: priority,
        Resolution_Details: null,
        Rating: null,
        Start_Date: currentDate.getTime(),
        End_Date: null, //needs a function close ticket
        Sub_Issue_Type: req.body.Sub_Issue_Type,
      })

      let newChat;
      if (requestedSubIssueType.toLowerCase() == 'other') {
        newChat = new Chat({
          _id: new mongoose.Types.ObjectId(),
          Client_ID: userId,
          Support_AgentID: null, //needs a function
          Messages: null,
          Start_Time: currentDate.getTime(),
          End_Time: null,
          Message_Count: 0,
          TicketID: newTicket._id
        });
        
        // Additional logic for newChat, if needed
      }

      const agent = await Agent.findById(newChat ? newChat.Support_AgentID : null);
      if (!agent && requestedSubIssueType.toLowerCase() == 'other') {
        return res.status(404).json({ error: 'Agent not found' });
      }

      // Additional logic for agent, if needed

      // Increase the ticket count in the agent table
      if (requestedSubIssueType.toLowerCase() == 'other') {
        agent.Ticket_Count = (agent.Ticket_Count || 0) + 1;
        agent.Active_Tickets = (agent.Active_Tickets || 0) + 1;
      }

      const savedTicket = await newTicket.save();
      const savedChat = newChat ? await newChat.save() : null;

      res.status(201).json({ ticket: savedTicket, chat: savedChat }); // Check this condition
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  rateAgent: async (req, res) => {
    try {

      const ticket = Ticket.findById(req.body.ticketId);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket does not exist' });
      }
      if (ticket.status != 'Closed') {
        return res.status(400).json({ error: 'This ticket/chat is not closed and cannot be rated' });
      }

      // get the agent id from the ticket
      const agentId = ticket.Assigned_AgentID;

      const agent = await Agent.findById(agentId);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      ticket.Rating = req.body.rating;
      const updatedTicket = await ticket.save();

      //update the agent's avg rating
      //the ticket count is updated the creation of the ticket function
      agent.Average_Rating = (req.body.rating + (agent.Average_Rating * (agent.Ticket_Count - 1))) / agent.Ticket_Count
      agent.Active_Tickets = agent.Active_Tickets--;

      if (req.body.rating <= 1) {
        newChat = new Chat({
          _id: new mongoose.Types.ObjectId(),
          Client_ID: userId,
          Support_AgentID: null, //needs a function
          Messages: null,
          Start_Time: currentDate.getTime(),
          End_Time: null,
          Message_Count: 0,
          TicketID: newTicket._id
        })
      }
      await agent.save();
      res.json({ticket: updatedTicket, chat: createChat ? newChat : null });

    } catch (error) {
      console.log(e.message)
      console.error(500).json({ error: 'Internal error' })
      throw error;
    }
  },
};

module.exports = clientController;