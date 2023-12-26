import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { LightOceanTheme } from "./themes";

const ViewMyTickets = () => {
  const theme = LightOceanTheme;
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [ratedTickets, setRatedTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tickets', { withCredentials: true });
        setTickets(response.data);
        const closed = response.data.filter(ticket => ticket.Status.toLowerCase() === 'closed');
        setClosedTickets(closed);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const isTicketRated = (ticketId) => ratedTickets.includes(ticketId);

  const handleStartChat = (ticket) => {
    console.log('Starting chat for ticket:', ticket);
    navigate(`/Chat/${ticket._id}`);
  };

  const handleRateAgent = async (ticketId, rating) => {
    try {
      const response = await axios.put('http://localhost:3000/api/v1/rateAgent', {
        ticketId,
        Rating: rating
      }, { withCredentials: true });

      console.log('Agent rated successfully:', response.data);
      setRatedTickets(prev => [...prev, ticketId]);  // Add the rated ticket to the list
    } catch (error) {
      console.error('Error rating agent:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <div className="max-w-[1640px] mx-auto bg-gray-200 bg-opacity-50 rounded-lg p-8 flex">
          <div className="w-1/3 pr-8">
            <img 
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=826&t=st=1703601129~exp=1703601729~hmac=56a715895e2952692f1f869a9ed91e8d7136ad68fa591b71ef4c45a842201c13" 
              alt="People asking questions" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className={`text-${theme.colors.primary} font-extrabold text-4xl mb-8 border-b-4 border-${theme.colors.primary} pb-4`}>
              Your Tickets
            </h2>
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <div key={index} className="mb-2 bg-white p-4 rounded-md shadow-md">
                  <h5 className={`text-${theme.colors.text} font-semibold text-lg mb-2`}>
                    Ticket ID {ticket._id}: {ticket.Status}
                  </h5>
                  <p className={`text-${theme.colors.text} mb-4`}>
                    {ticket.Description}
                  </p>
                  {(ticket.Status.toLowerCase() === 'closed' || ticket.Sub_Issue_Type.toLowerCase() === 'other') && (
                    <button
                      onClick={() => handleStartChat(ticket)}
                      className={`bg-${theme.colors.primary} py-2 px-4 rounded-full`}
                    >
                      Start Chat
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className={`text-${theme.colors.text}`}>
                No tickets found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rate Agents Section */}
      <div className="flex-1 p-8 mt-8">
        <div className="max-w-[1640px] mx-auto bg-gray-200 bg-opacity-50 rounded-lg p-8 flex flex-col">
          <h2 className={`text-${theme.colors.primary} font-extrabold text-4xl mb-8 border-b-4 border-${theme.colors.primary} pb-4`}>
            Rate Agents
          </h2>
          {closedTickets.length > 0 ? (
            closedTickets.map((ticket, index) => (
              !isTicketRated(ticket._id) && (
                <div key={index} className="mb-2 bg-gray p-4 rounded-md shadow-md flex items-center justify-between">
                  <div>
                    <h5 className={`text-${theme.colors.text} font-semibold text-lg mb-2`}>
                      Ticket ID {ticket._id}: {ticket.Status}
                    </h5>
                    <p className={`text-${theme.colors.text} mb-4`}>
                      {ticket.Description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label htmlFor={`rating-${ticket._id}`} className={`text-${theme.colors.text} mr-2`}>Rate:</label>
                    <select id={`rating-${ticket._id}`} className={`bg-${theme.colors.primary} text-gray py-2 px-4 rounded`}>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRateAgent(ticket._id, document.getElementById(`rating-${ticket._id}`).value)}
                      className={`bg-${theme.colors.primary} py-2 px-4 rounded ml-4`}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )
            ))
          ) : (
            <p className={`text-${theme.colors.text}`}>
              No closed tickets found to rate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMyTickets;
