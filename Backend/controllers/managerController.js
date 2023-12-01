import Ticket from '../models/ticket'; // Assuming the path to your ticket model

const managerController = {
  // Get all tickets
  getAllTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get tickets by status
  getTicketsByStatus: async (req, res) => {
    const { status } = req.params;
    try {
      const tickets = await Ticket.find({ Status: status });
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get tickets by agent ID
  getTicketsByAgent: async (req, res) => {
    const { agentId } = req.params;
    try {
      const tickets = await Ticket.find({ Assigned_AgentID: agentId });
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get tickets by priority
  getTicketsByPriority: async (req, res) => {
    const { priority } = req.params;
    try {
      const tickets = await Ticket.find({ Priority: priority });
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Add more functions based on your requirements

  // Example: Get tickets within a date range
  getTicketsByDateRange: async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
      const tickets = await Ticket.find({
        Start_Date: { $gte: new Date(startDate) },
        End_Date: { $lte: new Date(endDate) },
      });
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default managerController;

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
