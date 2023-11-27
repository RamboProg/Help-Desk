// Import required modules
const express = require('express');
// Create an instance of Express
const app = express();
// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const User = require('./models/userModel');
const Admin = require('./models/adminModel');
const Manager = require('./models/managerModel');
const Agent = require('./models/agentModel');
const Client = require('./models/clientModel');

async function getUser(userId) {
  try {
    const user = await User.findById({ _id: userId }); //assuming all users of different role types are also saved in the users table

    switch (user.RoleID) {
      case 1:
        return await Admin.findById(userId);
      case 2:
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

//additional function to view my tickets as a client
app.get('/:clientId/tickets', async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const tickets = await Ticket.find({ Ticket_Owner: clientId });

    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/tickets", async function (req, res) { //needs to be rechecked CHECK AGAIN
  try {
    const clientId = req.body.clientId;
    // check if the client exists
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ error: 'client not found' });
    }
    //getting current date for start date
    const currentDate = new Date();
    //checking to see if the subissue type is allowed or not 
    const allowedSubIssueTypes = ['Network', 'Software', 'Hardware'];
    const requestedSubIssueType = req.body.Sub_Issue_Type;

    if (!allowedSubIssueTypes.includes(requestedSubIssueType)) {
      return res.status(400).json({ error: 'Invalid Sub_Issue_Type. Allowed values are: Network, Software, Hardware.' });
    }

    const newTicket = newTicket({
      _id: new mongoose.Types.ObjectId(),
      Status: 'Open',
      Assigned_AgentID: null, //needs a function 
      Ticket_Owner: clientId,
      Issue_Type: req.body.issueType,
      Description: req.body.description,
      Priority: req.body.priority,
      Resolution_Details: null,
      Rating: null,
      Start_Date: currentDate.getTime(),
      End_Date: null, //needs a function close ticket
      Sub_Issue_Type: req.body.Sub_Issue_Type,
    })
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    agent.Ticket_Count = agent.Ticket_Count++;
    // save ticket.. recheck this part atleast 7 times
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);

  } catch (error) {
    console.log(e.message)
    console.error(500).json({ error: 'Internal error' })
    throw error;
  }
});


app.post("/api/v1/rateAgent", async function (req, res) {
  try {

    const ticket = Ticket.findById(req.body.ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket does not exist' });
    }

    const agent = await Agent.findById(req.params.agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    ticket.Rating = req.body.rating;
    const updatedTicket = await ticket.save();

    //update the agent's avg rating
    agent.Average_Rating = (req.body.rating + (agent.Average_Rating * (agent.Ticket_Count -1))) / agent.Ticket_Count
    await agent.save();
    res.json(updatedTicket);

  } catch (error) {
    console.log(e.message)
    console.error(500).json({ error: 'Internal error' })
    throw error;
  }
});
