import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);
  const [error, setError] = useState(null);
  const [newWorkflow, setNewWorkflow] = useState({
    Issue: '',
    Custom_Workflow: '',
    Sub_Issue_Type: ''
  });

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = () => {
    axios.get('http://localhost:3000/getWorkflows', { withCredentials: true })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.data;
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
  };

  const handleCreateWorkflow = () => {
    axios.post('http://localhost:3000/workflows', newWorkflow , { withCredentials: true })
      .then(() => {
        fetchWorkflows();
        setNewWorkflow({
          Issue: '',
          Custom_Workflow: '',
          Sub_Issue_Type: ''
        }); // Reset the form fields after successful creation
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleDeleteWorkflow = (issuesid) => {
    axios.delete(`http://localhost:3000/workflows/${issuesid}` , { withCredentials: true })
      .then(() => {
        fetchWorkflows();
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="container mx-auto p-8">
      {/* Create Workflow Form */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Create Workflow</h2>
        <input
          type="text"
          placeholder="Issue"
          value={newWorkflow.Issue}
          onChange={e => setNewWorkflow({ ...newWorkflow, Issue: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Custom Workflow"
          value={newWorkflow.Custom_Workflow}
          onChange={e => setNewWorkflow({ ...newWorkflow, Custom_Workflow: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Sub Issue Type"
          value={newWorkflow.Sub_Issue_Type}
          onChange={e => setNewWorkflow({ ...newWorkflow, Sub_Issue_Type: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateWorkflow}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create
        </button>
      </div>

      {/* Workflow List Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">ID</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Issue</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Custom Workflow</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Sub Issue Type</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-6 py-4">{workflow._id}</td>
              <td className="px-6 py-4">{workflow.Issue}</td>
              <td className="px-6 py-4">{workflow.Custom_Workflow}</td>
              <td className="px-6 py-4">{workflow.Sub_Issue_Type}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleDeleteWorkflow(workflow._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkflowList;
