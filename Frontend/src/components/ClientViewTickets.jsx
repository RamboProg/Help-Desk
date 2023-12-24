import React, { useState, useEffect } from "react";
import axios from "axios";
import { LightOceanTheme } from "./themes"; // Ensure you have this import path correct

const ViewMyTickets = () => {
  const theme = LightOceanTheme;

  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clientTickets', { withCredentials: true });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets in jsx:', error);
      }
    };
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clientTickets', { withCredentials: true });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets in jsx:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <div className="max-w-[1640px] mx-auto bg-gray-200 bg-opacity-50 rounded-lg p-8 flex">
          <div className="w-1/3 pr-8">
          <img 
              src="https://img.freepik.com/free-vector/flat-people-asking-questions-illustration_23-2148901520.jpg?w=996&t=st=1703180818~exp=1703181418~hmac=25d978773da4d75d494eebaeb3a84d8d87badb403309206e1174101eb499ab39" 
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
                    {ticket.Status}
                  </h5>
                  <p className={`text-${theme.colors.text} mb-4`}>
                    {ticket.Description}
                  </p>
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
    </div>
  );
};

export default ViewMyTickets;