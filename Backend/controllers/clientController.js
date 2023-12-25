const mongoose = require('mongoose');
const Client = require('../models/clientModel');
const Ticket = require('../models/ticketModel');
const Agent = require('../models/agentModel');
const Chat = require('../models/chatModel');
const { getUser } = require('../controllers/userController');
 const clientController = {

  getMyTickets: async (req, res) => {
    try {
      const { _id } = await getUser(req);
      const client = await Client.findById(_id);

      if (!client) {
        return res.status(404).json({ error: 'Client not found!' });
      }

      const tickets = await Ticket.find({ Ticket_Owner: _id });

      res.json(tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createTicket: async (req, res) => {
    try {
      const { _id } = getUser(req)
      // check if the client exists
      const client = await Client.findById(_id);

      if (!client) {
        return res.status(404).json({ error: 'client not found' });
      }
      //getting current date for start date
      const currentDate = new Date();
  
      const allowedIssueTypes = ['network', 'software', 'hardware'];
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
        Ticket_Owner: _id,
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
          Client_ID: _id,
          Support_AgentID: null, //needs a function
          Messages: null,
          Start_Time: currentDate.getTime(),
          End_Time: null,
          Message_Count: 0,
          TicketID: newTicket._id
        })
      }

      const agent = await Agent.findById(newChat.Support_AgentID); //also needs function to retrieve agent id
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
      //increasing the ticket count in the agent table
      agent.Ticket_Count = agent.Ticket_Count++;
      agent.Active_Tickets = agent.Active_Tickets++;

      const savedTicket = await newTicket.save();
      res.status(201).json({ ticket: newTicket, chat: newChat}); //check this condition


    } catch (error) {
      console.error('Error fetching tickets:', error);
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
          Client_ID: _id,
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