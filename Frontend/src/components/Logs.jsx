import React, { useState, useEffect } from "react";
import { LightOceanTheme } from "./themes";

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
        const response = await fetch("http://localhost:3000/api/logs" , { withCredentials: true });
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
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

  return (
    <div className="flex-1">
      <div className="flex justify-center items-center flex-1 h-full">
        <h2
          className={`text-${theme.colors.primary} font-extrabold text-4xl mb-8 border-b-4 border-${theme.colors.primary} pb-4`}
        >
          Logs
        </h2>
      </div>{" "}
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr
            className={`bg-${theme.colors.background} text-${theme.colors.text}`}
          >
            <th className="p-4 text-left border-b">Level</th>
            <th className="p-4 text-left border-b">Message</th>
            <th className="p-4 text-left border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={index}>
              <td className="p-4 border-b">{log.level}</td>
              <td className="p-4 border-b">{log.message}</td>
              <td className="p-4 border-b">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="text-center mt-8">
        {Array.from(
          { length: Math.ceil(logs.length / logsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className="m-2 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600"
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default LogsPage;
