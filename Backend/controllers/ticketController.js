const axios = require('axios');
const Ticket = require('../models/ticketModel');
const SupportAgent = require('../models/agentModel');
const { PriorityQueue } = require('../utils/PriorityQueue');

const highPriorityQueue = new PriorityQueue();
const mediumPriorityQueue = new PriorityQueue();
const lowPriorityQueue = new PriorityQueue();

const assignTicket = async () => {
    let ticket = highPriorityQueue.dequeue() || mediumPriorityQueue.dequeue() || lowPriorityQueue.dequeue();

    if (!ticket) {
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/predict', {
            Priority: ticket.Priority,
            Type: ticket.Issue_Type
        });

        const agentProbabilities = response.data.agent_probabilities;
        const sortedAgents = Object.keys(agentProbabilities).sort((a, b) => agentProbabilities[b] - agentProbabilities[a]);

        for (const agentId of sortedAgents) {
            if (agentProbabilities[agentId] === 0) {
                reenqueueTicketAtFront(ticket);
                return;
            }

            const assignedAgent = await SupportAgent.findById(agentId);
            if (assignedAgent && assignedAgent.Active_Tickets < 5) {
                ticket.Assigned_AgentID = assignedAgent._id;
                ticket.Status = 'Pending';
                await ticket.save();

                assignedAgent.Active_Tickets += 1;
                await assignedAgent.save();
                return;
            }
        }

<<<<<<< HEAD
// module.exports = {
//     assignTicket,
//     highPriorityQueue,
//     mediumPriorityQueue,
//     lowPriorityQueue
// };
=======
        reenqueueTicketAtFront(ticket);
    } catch (error) {
        console.error('Error in assigning ticket:', error);
        reenqueueTicketAtFront(ticket);
    }
};

const reenqueueTicketAtFront = (ticket) => {
    if (ticket.Priority === 'high') {
        highPriorityQueue.enqueueFront(ticket);
    } else if (ticket.Priority === 'medium') {
        mediumPriorityQueue.enqueueFront(ticket);
    } else {
        lowPriorityQueue.enqueueFront(ticket);
    }
};

module.exports = {
    assignTicket,
    highPriorityQueue,
    mediumPriorityQueue,
    lowPriorityQueue
};
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
