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

