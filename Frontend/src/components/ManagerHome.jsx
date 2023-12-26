// Manager.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { LightOceanTheme } from './themes';
import axios from 'axios';
import BarChart from './BarChart';

const Manager = () => {
  const theme = LightOceanTheme;
  const [agents, setAgents] = useState([]);
<<<<<<< HEAD
  const [chartData, setChartData] = useState(null);
=======
  const [issueTypeData, setIssueTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Issue Types',
        backgroundColor: `rgba(${theme.colors.primaryRGB}, 0.7)`,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        data: [],
      },
    ],
  });
  const [subIssueTypeData, setSubIssueTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Subissue Types',
        backgroundColor: `rgba(${theme.colors.secondaryRGB}, 0.7)`,
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        data: [],
      },
    ],
  });
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/manager/getAgents');
        // For now, just log the agent data to verify it's being fetched successfully
        console.log('Agent Data:', response.data.agents);
        // Update the state with the fetched agents
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchData();
  }, []);

<<<<<<< HEAD
  const handleGenerateReport = async (agentId) => {
    try {
      // Replace the following line with your actual logic to fetch chart data
      const response = await axios.get(`/api/v1/reports/tickets/TicketAnalytics/Status/${agentId}`);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
=======
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/reports/tickets');
        const tickets = response.data;

        // Extract issue types and subissue types from tickets
        const issueTypes = tickets.map((ticket) => ticket.Issue_Type);
        const subIssueTypes = tickets.map((ticket) => ticket.Sub_Issue_Type);

        console.log('Issue Types:', issueTypes);
        console.log('Subissue Types:', subIssueTypes);

        // Count occurrences of each issue type
        const issueTypeCounts = countOccurrences(issueTypes);

        // Count occurrences of each subissue type
        const subIssueTypeCounts = countOccurrences(subIssueTypes);

        // Set data for issue types bar chart
        setIssueTypeData((prevData) => ({
          ...prevData,
          labels: Object.keys(issueTypeCounts),
          datasets: [
            {
              ...prevData.datasets[0],
              data: Object.values(issueTypeCounts),
            },
          ],
        }));

        // Set data for subissue types bar chart
        setSubIssueTypeData((prevData) => ({
          ...prevData,
          labels: Object.keys(subIssueTypeCounts),
          datasets: [
            {
              ...prevData.datasets[0],
              data: Object.values(subIssueTypeCounts),
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTicketData();
  }, []);

  const countOccurrences = (arr) =>
    arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10, // Adjust this value based on your data
      },
    },
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
  };

  return (
    <div className="bg-cover bg-center h-screen flex justify-center items-center">
<<<<<<< HEAD
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
=======
      <div className="max-w-[1200px] mx-auto p-4">
        <div className="flex mb-8">
          {/* Bar Chart for Issue Types */}
          <div className="w-1/2 pr-4">
            <h2 className={`text-${theme.colors.primary} font-bold text-2xl mb-4`}>
              Issue Types Chart
            </h2>
            <Bar data={issueTypeData} height={100} options={chartOptions} />
          </div>

          {/* Bar Chart for Subissue Types */}
          <div className="w-1/2 pl-4">
            <h2 className={`text-${theme.colors.primary} font-bold text-2xl mb-4`}>
              Subissue Types Chart
            </h2>
            <Bar data={subIssueTypeData} height={100} options={chartOptions} />
          </div>
        </div>

        {/* Rest of the content */}
        <h1 className={`text-${theme.colors.primary} font-bold text-4xl mb-4`}>
          Welcome to Manager Dashboard
        </h1>
        <p className={`text-${theme.colors.text} text-lg my-4`}>
          Manage and oversee the operations of your Help Desk. Access tools and features to administer users, handle tickets, and analyze support data.
        </p>
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
      </div>
    </div>
  );
};

export default Manager;
