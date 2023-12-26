// Manager.js
import React, { useState, useEffect } from 'react';
import { LightOceanTheme } from './themes';
import axios from 'axios';
import BarChart from './BarChart';

const Manager = () => {
  const theme = LightOceanTheme;
  const [agents, setAgents] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/manager/getAgents');
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = async (agentId) => {
    try {
      // Replace the following line with your actual logic to fetch chart data
      const response = await axios.get(`/api/v1/reports/tickets/TicketAnalytics/Status/${agentId}`);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <div className="bg-cover bg-center h-screen flex justify-center items-center">
      <div className='max-w-[1640px] mx-auto px-4 py-12 text-center bg-white bg-opacity-50 rounded-lg p-8'>
        <h1 className={`text-${theme.colors.primary} font-bold text-4xl mb-8`}>
          Welcome to Manager Dashboard
        </h1>

        {/* ... existing code ... */}

        <div className="mt-8">
          <h2 className={`text-${theme.colors.primary} font-bold text-2xl mb-4`}>
            Support Agents
          </h2>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              {/* ... existing code ... */}
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  {/* ... existing code ... */}
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

        {/* Add the BarChart component */}
        {chartData && <BarChart chartData={chartData} />}
      </div>
    </div>
  );
};

export default Manager;
