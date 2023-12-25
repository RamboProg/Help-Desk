import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const AgentIssuesChart = () => {
  const [chartData, setChartData] = useState(null);
  const [agentId, setAgentId] = useState(1); // Replace with the actual agent ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/reports/tickets/agent/${agentId}`);
        const data = response.data;

        // Process data to get counts for each issue type
        const counts = data.reduce((acc, ticket) => {
          const issueType = ticket.Issue_Type;
          acc[issueType] = (acc[issueType] || 0) + 1;
          return acc;
        }, {});

        // Prepare data for Chart.js
        const chartData = {
          labels: Object.keys(counts),
          datasets: [{
            label: 'Number of Issues',
            data: Object.values(counts),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [agentId]);

  useEffect(() => {
    // Render the chart when chartData is available
    if (chartData) {
      const ctx = document.getElementById('agentIssuesChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
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
    }
  }, [chartData]);

  return (
    <div>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <canvas id="agentIssuesChart"></canvas>
      </div>
    </div>
  );
};

export default AgentIssuesChart;
