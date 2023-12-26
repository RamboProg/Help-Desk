import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/getWorkflows') // Use axios.get to fetch the data
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.data; // Axios automatically parses the JSON response
      })
      .then(data => {
        if (data && Array.isArray(data.workflows)) {
          setWorkflows(data.workflows);
        } else {
          throw new Error('Unexpected data format');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Workflow List</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Custom Workflow</th>
            <th>Sub Issue Type</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow, index) => (
            <tr key={index}>
              <td>{workflow.Issue}</td>
              <td>{workflow.Custom_Workflow}</td>
              <td>{workflow.Sub_Issue_Type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkflowList;
