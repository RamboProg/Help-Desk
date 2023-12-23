import React, { useState, useEffect } from 'react';
import { LightOceanTheme } from './themes';
import axios from 'axios';

const Manager = () => {
  const theme = LightOceanTheme;
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/manager/getAgents',);
        console.log(response);
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = (agentId) => {
    // This is where you can add logic to generate a report for the specific agent
    console.log(`Generating report for agent with ID ${agentId}`);
    // Add your report generation logic here
  };

  return (
    <div 
      className="bg-cover bg-center h-screen flex justify-center items-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      <div className='max-w-[1640px] mx-auto px-4 py-12 text-center bg-white bg-opacity-50 rounded-lg p-8'>
        <h1 className={`text-${theme.colors.primary} font-bold text-4xl mb-8`}>
          Welcome to Manager Dashboard
        </h1>

        <p className={`text-${theme.colors.text} text-xl mt-8`}>
          Manage and oversee the operations of your Help Desk.
        </p>
        <p className={`text-${theme.colors.text} text-lg mb-4`}>
          Access tools and features to administer users, handle tickets, and analyze support data.
        </p>

        {/* Table Section */}
        <div className="mt-8">
          <h2 className={`text-${theme.colors.primary} font-bold text-2xl mb-4`}>
            Support Agents
          </h2>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Agent Name</th>
                <th className="border border-gray-300 p-2">Pref Type</th>
                <th className="border border-gray-300 p-2">Average Rating</th>
                <th className="border border-gray-300 p-2">Ticket Count</th>
                <th className="border border-gray-300 p-2">Active Tickets</th>
                <th className="border border-gray-300 p-2">Generate Report</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td className="border border-gray-300 p-2">{agent.Username}</td>
                  <td className="border border-gray-300 p-2">{agent.Pref_Type}</td>
                  <td className="border border-gray-300 p-2">{agent.Average_Rating}</td>
                  <td className="border border-gray-300 p-2">{agent.Ticket_Count}</td>
                  <td className="border border-gray-300 p-2">{agent.Active_Tickets}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className={`bg-${theme.colors.primary} text-white px-4 py-2 rounded`}
                      onClick={() => handleGenerateReport(agent._id)}
                    >
                      Generate Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manager;
