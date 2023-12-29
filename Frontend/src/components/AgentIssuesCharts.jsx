import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const AgentIssuesChart = () => {
  const [chartData, setChartData] = useState(null);
  const [agentId, setAgentId] = useState(1); // Replace with the actual agent ID
  const [averageResolutionTime, setAverageResolutionTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://help-desk-ruddy.vercel.app/api/v1/reports/tickets/agent/${agentId}`);
        const data = response.data;
        console.log(data);

        // Process data to get counts for each issue type
        const counts = data.reduce((acc, ticket) => {
          const issueType = ticket.Issue_Type;
          acc[issueType] = (acc[issueType] || 0) + 1;
          return acc;
        }, {});

        // Count the number of open and closed tickets
        const openCount = data.filter(ticket => ticket.Status === 'Open').length;
        const closeCount = data.filter(ticket => ticket.Status === 'Close').length;

        // Calculate average resolution time
        const totalResolutionTime = data.reduce((acc, ticket) => {
          const startDate = new Date(ticket.Created_At);
          const endDate = new Date(ticket.Closed_At || Date.now()); // Use the current date if the ticket is not closed yet
          const resolutionTime = endDate - startDate;
          return acc + resolutionTime;
        }, 0);

        const avgResolutionTime = totalResolutionTime / data.length;
        setAverageResolutionTime(avgResolutionTime);

        // Prepare data for Bar Chart.js
        const barChartData = {
          labels: Object.keys(counts),
          datasets: [{
            label: 'Number of Issues',
            data: Object.values(counts),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        };

        // Prepare data for Pie Chart.js
        const pieChartData = {
          labels: ['Open', 'Close'],
          datasets: [{
            data: [openCount, closeCount],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          }],
        };

        setChartData({ barChart: barChartData, pieChart: pieChartData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [agentId]);

  useEffect(() => {
    // Render the charts when chartData is available
    if (chartData) {
      const barCtx = document.getElementById('agentIssuesBarChart').getContext('2d');
      const barChart = new Chart(barCtx, {
        type: 'bar',
        data: chartData.barChart,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Issues',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Issue Types',
              },
            },
          },
        },
      });

      const pieCtx = document.getElementById('agentIssuesPieChart').getContext('2d');
      const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: chartData.pieChart,
      });

      // Cleanup function to destroy the charts when the component unmounts
      return () => {
        barChart.destroy();
        pieChart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <canvas id="agentIssuesBarChart"></canvas>
      </div>
      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <canvas id="agentIssuesPieChart"></canvas>
      </div>
      {averageResolutionTime !== null && (
        <div>
          <p>Average Resolution Time: {averageResolutionTime} milliseconds</p>
        </div>
      )}
    </div>
  );
};

export default AgentIssuesChart;
