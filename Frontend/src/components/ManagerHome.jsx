import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { LightOceanTheme } from './themes';
import axios from 'axios';

const Manager = () => {
  const theme = LightOceanTheme;
  const [agents, setAgents] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://help-desk-ruddy.vercel.app/api/v1/manager/getAgents', {withCredentials: true});
        console.log('Agent Data:', response.data.agents);
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get('https://help-desk-ruddy.vercel.app/api/v1/reports/tickets', {withCredentials: true});
        const tickets = response.data;
        const issueTypes = tickets.map((ticket) => ticket.Issue_Type);
        const subIssueTypes = tickets.map((ticket) => ticket.Sub_Issue_Type);
        const issueTypeCounts = countOccurrences(issueTypes);
        const subIssueTypeCounts = countOccurrences(subIssueTypes);

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
        max: 10,
      },
    },
  };

  return (
    <div 
      className="bg-cover bg-center h-screen flex justify-center items-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      <div className='max-w-[1640px] mx-auto px-4 py-12 text-center bg-white bg-opacity-50 rounded-lg p-8'>
        <h1 className={`text-${theme.colors.primary} font-bold text-4xl mb-8`}>
          Welcome to Manager Dashboard
        </h1>
        <p className={`text-${theme.colors.text} text-lg my-4`}>
          Manage and oversee the operations of your Help Desk. Access tools and features to administer users, handle tickets, and analyze support data.
        </p>

        <div className="max-w-[1200px] mx-auto p-4">
          <div className="flex mb-8">
            <div className="w-1/2 pr-4">
              <h2 className={`text-${theme.colors.primary} font-bold text-2xl mb-4`}>
                Issue Types Chart
              </h2>
              <Bar data={issueTypeData} height={100} options={chartOptions} />
            </div>
            <div className="w-1/2 pl-4">
              <h2 className={`text-${theme.colors.primary} font-bold text-2xl mb-4`}>
                Subissue Types Chart
              </h2>
              <Bar data={subIssueTypeData} height={100} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
