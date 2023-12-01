// controllers/managerController.js
const Ticket = require('../models/ticketModel');

const getTicketStatus = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json({ status: ticket.Status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error; Try Again :(' });
  }
};

// Assuming you have both ticketSchema and supportAgentSchema available in your code

const getResolutionTime = async (req, res) => {
    const { ticketId } = req.params;
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      const startDateTime = new Date(ticket.Start_Date);
      const endDateTime = new Date(ticket.End_Date);
  
      // Calculate the resolution time in milliseconds
      const resolutionTimeInMilliseconds = endDateTime - startDateTime;
  
      // Convert resolution time to hours, minutes, and seconds
      const resolutionTimeInSeconds = resolutionTimeInMilliseconds / 1000;
      const hours = Math.floor(resolutionTimeInSeconds / 3600);
      const minutes = Math.floor((resolutionTimeInSeconds % 3600) / 60);
      const seconds = Math.floor(resolutionTimeInSeconds % 60);
  
      const resolutionTime = `${hours}h ${minutes}m ${seconds}s`;
  
      res.json({ resolutionTime });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error; Try Again :(' });
    }
  };
  
  const getAgentPerformance = async (req, res) => {
    const { ticketId } = req.params;
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Assuming the Assigned_AgentID corresponds to the _id of the support agent
      const supportAgent = await SupportAgent.findById(ticket.Assigned_AgentID);
      if (!supportAgent) {
        return res.status(404).json({ message: 'Support Agent not found' });
      }
  
      const agentPerformance = {
        assignedAgentId: supportAgent._id,
        email: supportAgent.Email,
        username: supportAgent.Username,
        averageRating: supportAgent.Average_Rating,
        ticketCount: supportAgent.Ticket_Count,
        activeTickets: supportAgent.Active_Tickets,
        // Add more relevant agent performance metrics here
      };
  
      res.json({ agentPerformance });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error; Try Again :(' });
    }
  };
  

module.exports = {
  getTicketStatus,
  getResolutionTime,
  getAgentPerformance
};
