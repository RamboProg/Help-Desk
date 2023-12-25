const Ticket = require('../models/ticketModel.js');
const AgentModel = require('../models/agentModel.js');
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
  getTicketsByAgent : async (req, res) => {
    try {
      const {agentId} = req.params.agentId;
      console.log(agentId);
      console.log("helloAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      const tickets = await Ticket.find({ Assigned_AgentID: agentId });
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
  getAgents : async (req, res) => {
    try {
      const agents = await AgentModel.find();
      return res.status(200).json({ agents });
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

  // Get tickets within a date range
  getTicketsByDateRange: async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
      const tickets = await Ticket.find({
        Start_Date: { $gte: new Date(startDate) },
        End_Date: { $lte: new Date(endDate) }
      });
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get tickets by resolution time
  getTicketsByResolutionTime: async (req, res) => {
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
  },

  // Get tickets by issue type
  getTicketsByIssueType: async (req, res) => {
    const { issueType } = req.params;
    try {
      const tickets = await Ticket.find({ Issue_Type: issueType });
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get tickets by sub issue type
  getTicketsBySubIssueType: async (req, res) => {
    const { subIssueType } = req.params;
    try {
      const tickets = await Ticket.find({ Sub_Issue_Type: subIssueType });
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get analytics for tickets by status
  getTicketAnalyticsByStatus: async (req, res) => {
    try {
      const ticketCountsByStatus = await Ticket.aggregate([{ $group: { _id: '$Status', count: { $sum: 1 } } }]);

      const labels = ticketCountsByStatus.map((entry) => entry._id);
      const data = ticketCountsByStatus.map((entry) => entry.count);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Ticket Counts by Status',
            data,
            // dynamicColors for each bar
            backgroundColor: labels.map(() => {
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              return `#${randomColor}`;
            })
          }
        ]
      };

      const chartOptions = {
        responsive: true
      };

      res.json({ chartData, chartOptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get analytics for tickets by priority
  getTicketAnalyticsByPriority: async (req, res) => {
    try {
      const ticketCountsByPriority = await Ticket.aggregate([{ $group: { _id: '$Priority', count: { $sum: 1 } } }]);

      const labels = ticketCountsByPriority.map((entry) => entry._id);
      const data = ticketCountsByPriority.map((entry) => entry.count);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Ticket Counts by Priority',
            data,
            // dynamicColors for each bar
            backgroundColor: labels.map(() => {
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              return `#${randomColor}`;
            })
          }
        ]
      };

      const chartOptions = {
        responsive: true
      };

      res.json({ chartData, chartOptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get analytics for tickets by issue type
  getTicketAnalyticsByIssueType: async (req, res) => {
    try {
      const ticketCountsByIssueType = await Ticket.aggregate([{ $group: { _id: '$Issue_Type', count: { $sum: 1 } } }]);

      const labels = ticketCountsByIssueType.map((entry) => entry._id);
      const data = ticketCountsByIssueType.map((entry) => entry.count);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Ticket Counts by Issue Type',
            data,
            // dynamicColors for each bar
            backgroundColor: labels.map(() => {
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              return `#${randomColor}`;
            })
          }
        ]
      };

      const chartOptions = {
        responsive: true
      };

      res.json({ chartData, chartOptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get analytics for tickets by sub issue type
  getTicketAnalyticsBySubIssueType: async (req, res) => {
    try {
      const ticketCountsBySubIssueType = await Ticket.aggregate([
        { $group: { _id: '$Sub_Issue_Type', count: { $sum: 1 } } }
      ]);

      const labels = ticketCountsBySubIssueType.map((entry) => entry._id);
      const data = ticketCountsBySubIssueType.map((entry) => entry.count);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Ticket Counts by Sub Issue Type',
            data,
            // dynamicColors for each bar
            backgroundColor: labels.map(() => {
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              return `#${randomColor}`;
            })
          }
        ]
      };

      const chartOptions = {
        responsive: true
      };

      res.json({ chartData, chartOptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports =  managerController;
