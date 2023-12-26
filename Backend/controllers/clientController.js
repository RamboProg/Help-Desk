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
    const _id = req.user.userId;
    // console.log(_id)
    try {
      const client = await Client.findById(_id);
      if (!client) {
        return res.status(404).json({ error: 'client not found' });
      }

      const tickets = await Ticket.find({ Ticket_Owner: _id });

      res.status(200).json(tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createTicket: async (req, res) => {
    try {
        const _id = req.user.userId; 
        const user = await Client.findById(_id);
  
      const requestedSubIssueType = req.body.Sub_Issue_Type;
      const requestedIssueType = req.body.Issue_Type;
      let priority;
      let agentId;

      // Check if the client exists
      const client = await Client.findById(user);
      if (!client) {
        return res.status(404).json({ error: 'client not found' });
      }

      const currentDate = new Date();

      const allowedIssueTypes = ['network', 'software', 'hardware'];

      if (!allowedIssueTypes.includes(requestedIssueType)) {
        return res.status(400).json({ error: 'Invalid Issue_Type. Allowed values are: Network, Software, Hardware.' });
      }

      let validSubIssueTypes;

      switch (requestedIssueType) {
        case 'hardware':
          validSubIssueTypes = ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment', 'other'];
          break;
        case 'software':
          validSubIssueTypes = ['Operating system', 'Application software', 'Custom software', 'Integration issues', 'other'];
          break;
        case 'network':
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

      const highPriorityQueue = new PriorityQueue();
      const mediumPriorityQueue = new PriorityQueue();
      const lowPriorityQueue = new PriorityQueue();


      const lastTicket = await Ticket.findOne({}, {}, { sort: { _id: -1 } }); // Find the last user
      const lastTicketId = lastTicket ? lastTicket._id : 0; // Get the last _id or default to 0 if no user exists
      const newTicketId = lastTicketId + 1; // Increment the last _id

      const newTicket = new Ticket({
        _id: newTicketId,
        Status: 'Open',
        Assigned_AgentID: null, // cannot be null
        Ticket_Owner: user,
        Issue_Type: requestedIssueType,
        Description: req.body.description,
        Priority: null,
        Resolution_Details: null,
        Rating: null,
        Start_Date: currentDate.getTime(),
        End_Date: null, // needs a function close ticket
        Sub_Issue_Type: req.body.Sub_Issue_Type,
      });

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

      
      const url = "http://127.0.0.1:5000/predict";
      const response = await axios.post(url, {
        Priority: priority,
        Type: requestedIssueType,
      });

      if (!response.data || !response.data.agent_probabilities) {
        console.error('Invalid response from prediction server');
        return res.status(500).json({ error: 'Internal server error' });
      }
      const agentProbabilities = response.data.agent_probabilities;
      const sortedAgents = Object.keys(agentProbabilities).sort(
        (a, b) => agentProbabilities[b] - agentProbabilities[a]
      );

      function findHighestAgent(probabilities) {
        let highestAgent;
        let highestProbability = -1; // Assuming probabilities are between 0 and 1

        for (const agent in probabilities) {
          const probability = probabilities[agent];

          if (probability > highestProbability) {
            highestProbability = probability;
            highestAgent = agent;
          }
        }

        return highestAgent;
      }

      const highestAgent = findHighestAgent(response.data.agent_probabilities);

      switch (highestAgent) {
        case 'Agent 1':
          agentId = 1;
          break;
        case 'Agent 2':
          agentId = 2;
          break;
        case 'Agent 3':
          agentId = 3;
          break;
        default:
          // Handle the default case if 'response' doesn't match any case
          break;
      }

      let assignedAgent = await Agent.findOne({ _id: agentId });
      if (assignedAgent && assignedAgent.Active_Tickets < 5) {
        newTicket.Assigned_AgentID = assignedAgent._id;

       
      } else {
        if (!newTicket.Assigned_AgentID) {
          let alternativeAgentId;

          // Iterate through the sorted agents to find the next available agent
          for (const agentName of sortedAgents) {
            const agentIndex = agentName.split(' ')[1];
            const alternativeAgent = await Agent.findOne({ _id: agentIndex });

            if (alternativeAgent && alternativeAgent.Active_Tickets < 5) {
              alternativeAgentId = alternativeAgent._id;
              break;
            }
          }

          if (alternativeAgentId) {
            newTicket.Assigned_AgentID = alternativeAgentId;

        

            try {
              const assignedAgent = await Agent.findOne({ _id: alternativeAgentId });

              if (assignedAgent) {
                assignedAgent.Ticket_Count = (assignedAgent.Ticket_Count || 0) + 1;
                assignedAgent.Active_Tickets = (assignedAgent.Active_Tickets || 0) + 1;

                assignedAgent.save();
              }
            } catch (agentError) {
              console.error('Error processing agent:', agentError);
              return res.status(500).json({ error: 'Internal server error' });
            }
          } else {
            return res.status(404).json({ error: 'No available agent found' });
          }
        }

      }

      if (!newTicket.Assigned_AgentID) {
        return res.status(404).json({ error: 'No available agent found' });
      }

      try {
        if (!assignedAgent && requestedSubIssueType == 'other') {
          return res.status(404).json({ error: 'Agent not found' });
        }


        assignedAgent.Ticket_Count = (assignedAgent.Ticket_Count || 0) + 1;
        assignedAgent.Active_Tickets = (assignedAgent.Active_Tickets || 0) + 1;

        assignedAgent.save();

      } catch (agentError) {
        console.error('Error processing agent:', agentError);
        return res.status(500).json({ error: 'Internal server error' });
      }
      newTicket.save();
      // newChat.save();

      result = {
        ticket: newTicket,
      };
     
      res.json(result);

    } catch (error) {
      console.error('Error creating ticket:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

rateAgent: async (req, res) => {
  try {
    const _id = req.user.userId; 
    const client = await Client.findById(_id);
    if (!client) {
      return res.status(404).json({ error: 'client not found' });
    }

    const ticketId = req.body.ticketId;
    const rating = parseInt(req.body.Rating); // Convert the rating to an integer
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket does not exist' });
    }

    if (ticket.Status !== 'Closed') {
      return res.status(400).json({ error: 'This ticket is not closed yet and cannot be rated' });
    }

    // Get the agent id from the ticket
    const agentId = ticket.Assigned_AgentID;

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Update the agent's avg rating
    // Check for zero ticket count to avoid division by zero
    if (agent.Ticket_Count === 0) {
      agent.Average_Rating = rating;
    } else {
      agent.Average_Rating = ((agent.Average_Rating * agent.Ticket_Count) + rating) / (agent.Ticket_Count + 1);
    }


    await agent.save();

    res.json({ message: 'Agent rated successfully', agent });

  } catch (error) {
    console.error('Error Inserting Rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
,


};



module.exports = clientController;
