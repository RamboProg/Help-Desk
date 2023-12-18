const mongoose = require('mongoose');
const Client = require('../models/clientModel');
const Ticket = require('../models/ticketModel');
const Agent = require('../models/agentModel');
const Chat = require('../models/chatModel');
const axios = require('axios');
const { getUser } = require('../controllers/userController');
const { PriorityQueue } = require('../utils/PriorityQueue');
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
      const userId = req.user.id;
      const requestedSubIssueType = req.body.Sub_Issue_Type;
      
      const client = await Client.findById(userId);      // check if the client exists
      if (!client) {
        return res.status(404).json({ error: 'client not found' });
      }
      const currentDate = new Date();

      const allowedIssueTypes = ['Network', 'Software', 'Hardware'];
      const requestedIssueType = req.body.Issue_Type;

      if (!allowedIssueTypes.includes(requestedIssueType)) {
        return res.status(400).json({ error: 'Invalid Sub_Issue_Type. Allowed values are: Network, Software, Hardware.' });
      }
      let validSubIssueTypes;

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

          if (!validSubIssueTypes.includes(requestedSubIssueType)) {
            return res.status(400).json({ error: 'Invalid Sub issue Type' });
          }
      }
      const highPriority = ['Servers', 'Networking equipment', 'Operating system', 'Integration issues', 'Email issues'];
      const mediumPriority = ['Laptops', 'Desktops', 'Application software', 'Website errors'];
      let priority;

      const highPriorityQueue = new PriorityQueue();
      const mediumPriorityQueue = new PriorityQueue();
      const lowPriorityQueue = new PriorityQueue();

      const newTicket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        Status: 'Open',
        Assigned_AgentID: null, //cannot be null
        Ticket_Owner: userId,
        Issue_Type: req.body.Issue_Type,
        Description: req.body.description,
        Priority: null,
        Resolution_Details: null,
        Rating: null,
        Start_Date: currentDate.getTime(),
        End_Date: null, //needs a function close ticket
        Sub_Issue_Type: req.body.Sub_Issue_Type,
      })
      
      
      
      if (highPriority.includes(requestedSubIssueType)) {
        priority = 'high';
        highPriorityQueue.enqueue(newTicket);
      } else if (mediumPriority.includes(requestedSubIssueType)) {
        priority = 'medium';
        mediumPriorityQueue.enqueue(newTicket);
      } else {
        priority = 'low';
        lowPriorityQueue.enqueue(newTicket);
      }

      newTicket.Priority = priority;
      
      const reenqueueTicketAtFront = (newTicket) => {
        if (newTicket.Priority === 'high') {
            highPriorityQueue.enqueueFront(newTicket);
        } else if (newTicket.Priority === 'medium') {
            mediumPriorityQueue.enqueueFront(newTicket);
        } else {
            lowPriorityQueue.enqueueFront(newTicket);
        }
    };
      

      //newTicket = highPriorityQueue.dequeue() || mediumPriorityQueue.dequeue() || lowPriorityQueue.dequeue();
      //console.log(newTicket);

      const response = await axios.post('http://localhost:3000/predict', {
        Priority: newTicket.Priority,
        Type: newTicket.Issue_Type
      });

      const agentProbabilities = response.data.agent_probabilities;
      const sortedAgents = Object.keys(agentProbabilities).sort((a, b) => agentProbabilities[b] - agentProbabilities[a]);
      for (const agentId of sortedAgents) {
        if (agentProbabilities[agentId] === 0)
          reenqueueTicketAtFront(newTicket);

        const assignedAgent = await SupportAgent.findById(agentId);
        if (assignedAgent && assignedAgent.Active_Tickets < 5) {
          newTicket.Assigned_AgentID = assignedAgent._id;
          newTicket.Status = 'Pending';
          await newTicket.save();

        } else {
          reenqueueTicketAtFront(newTicket);
        }
      }

      // let newChat;
      // if (requestedSubIssueType.toLowerCase() == 'other') {
      //   newChat = new Chat({
      //     _id: new mongoose.Types.ObjectId(),
      //     Client_ID: userId,
      //     Support_AgentID: assignedAgent._id,
      //     Messages: null,
      //     Start_Time: currentDate.getTime(),
      //     End_Time: null,
      //     Message_Count: 0,
      //     TicketID: newTicket._id
      //   });

      // }

      // const assignedAgent = await Agent.findById(newChat ? newChat.Support_AgentID : null);
      // if (!assignedAgent && requestedSubIssueType.toLowerCase() == 'other') {
      //   return res.status(404).json({ error: 'Agent not found' });
      // }



      assignedAgent.Ticket_Count = (assignedAgent.Ticket_Count || 0) + 1;
      assignedAgent.Active_Tikets = (assignedAgent.Active_Tickets || 0) + 1;


      await assignedAgent.save();
      const savedTicket = await newTicket.save();
      // const savedChat = newChat ? await newChat.save() : null;
      

    res.status(201).json({ newTicket: savedTicket/*, chat: savedChat */}); // Check this condition
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
      res.json({ ticket: updatedTicket, chat: createChat ? newChat : null });

    } catch (error) {
      console.log(e.message)
      console.error(500).json({ error: 'Internal error' })
      throw error;
    }
  },


};

module.exports = clientController;