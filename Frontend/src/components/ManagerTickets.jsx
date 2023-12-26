// TicketList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketDetailsModal from './TicketDetailsModal';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/reports/tickets', {withCredentials: true});
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleGenerateReport = async (ticketId, agentId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/reports/tickets/ticketsId/${ticketId}`,{withCredentials: true});
      setSelectedTicket(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching ticket details:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', paddingTop: '20px' }}>
      <h1 style={{ color: '#333' }}>Ticket List</h1>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '80%',
          margin: 'auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd', color: '#333' }}>
            <th style={{ padding: '12px' }}>Ticket ID</th>
            <th style={{ padding: '12px' }}>Assigned Agent ID</th>
            <th style={{ padding: '12px' }}>Ticket Owner</th>
            <th style={{ padding: '12px' }}>Issue Type</th>
            <th style={{ padding: '12px' }}>Description</th>
            <th style={{ padding: '12px' }}>Generate Report</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{ticket._id}</td>
              <td style={{ padding: '12px' }}>{ticket.Assigned_AgentID}</td>
              <td style={{ padding: '12px' }}>{ticket.Ticket_Owner}</td>
              <td style={{ padding: '12px' }}>{ticket.Issue_Type}</td>
              <td style={{ padding: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ticket.Description}
              </td>
              <td style={{ padding: '12px' }}>
                <button
                  style={{
                    background: '#4caf50',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleGenerateReport(ticket._id, ticket.Assigned_AgentID)}
                >
                  Generate Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TicketDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} ticket={selectedTicket} />
    </div>
  );
};

export default TicketList;
