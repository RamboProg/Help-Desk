import React, { useState, useEffect } from "react";
import { LightOceanTheme } from "./themes";
import axios from "axios";

const LogsPage = () => {
  const theme = LightOceanTheme;

  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("https://help-desk-ruddy.vercel.app/logs", { withCredentials: true });

        if (response.status === 200) {
          setLogs(response.data);
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(logs.length / logsPerPage);

  return (
    <div className={`flex-1 ${theme.background}`}>
      <div className="flex justify-center items-center flex-1 h-full">
        <h2
          className={`text-${theme.primary} font-extrabold text-4xl mb-8 border-b-4 border-${theme.primary} pb-4`}
        >
          Logs
        </h2>
      </div>
      <table className={`w-full border-collapse mt-5 ${theme.border}`}>
        <thead>
          <tr className={`bg-${theme.background} text-${theme.text}`}>
            <th className="p-4 text-left border-b">Level</th>
            <th className="p-4 text-left border-b">Message</th>
            <th className="p-4 text-left border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={index} className={`bg-${index % 2 === 0 ? "gray-200" : "white"}`}>
              <td className="p-4 border-b">{log.level}</td>
              <td className="p-4 border-b">{log.message}</td>
              <td className="p-4 border-b">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`m-2 px-4 py-2 ${
              currentPage === i + 1
                ? `bg-blue-500 text-white hover:bg-blue-400`
                : `bg-${theme.secondary} text-${theme.primary} hover:bg-${theme.secondary} hover:text-white hover:bg-blue-400`
            } rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LogsPage;
