// TicketDetailsModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const TicketDetailsModal = ({ isOpen, onClose, ticket }) => {
  const [agentRating, setAgentRating] = useState(null);

  useEffect(() => {
    const fetchAgentRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/reports/tickets/agentId/${ticket.Assigned_AgentID}`);
        setAgentRating(response.data.Average_Rating);
      } catch (error) {
        console.error('Error fetching agent rating:', error);
      }
    };

    if (ticket) {
      fetchAgentRating();
    }
  }, [ticket]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          width: '300px',
          height: '200px',
          margin: 'auto',
          borderRadius: '8px',
          padding: '20px',
        },
      }}
    >
      {ticket ? (
        <div>
          <h2 style={{ textAlign: 'center' }}>Ticket Details</h2>
          <p>
            <strong>Status:</strong> {ticket.Status}
          </p>
          <p>
            <strong>Resolution Time:</strong>{' '}
            {ticket.End_Date && ticket.Start_Date
              ? Math.ceil((new Date(ticket.End_Date) - new Date(ticket.Start_Date)) / (1000 * 3600 * 24))
              : 'N/A'}
            {' days'}
          </p>
          {/* Display agent performance details */}
          <p>
            <strong>Agent Rating:</strong> {agentRating || 'N/A'}
          </p>
          <button
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default TicketDetailsModal;
