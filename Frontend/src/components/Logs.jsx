import React, { useState, useEffect } from 'react';
import { LightOceanTheme } from './themes';

const LogsPage = () => {
  const theme = LightOceanTheme;

  // State to store logs fetched from the backend
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10; // Number of logs to display per page

  // Fetch logs from the backend API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/logs'); // Updated API endpoint URL
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
        } else {
          console.error('Failed to fetch logs');
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  // Calculate current logs to display based on pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  // Logic to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Table styles
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd',
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px' }}>Logs Page</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Level</th>
            <th style={thStyle}>Message</th>
            <th style={thStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={index}>
              <td style={tdStyle}>{log.level}</td>
              <td style={tdStyle}>{log.message}</td>
              <td style={tdStyle}>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {Array.from({ length: Math.ceil(logs.length / logsPerPage) }, (_, i) => (
          <button 
            key={i} 
            onClick={() => handlePageChange(i + 1)}
            style={{ margin: '5px', padding: '8px 12px', cursor: 'pointer' }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LogsPage;
