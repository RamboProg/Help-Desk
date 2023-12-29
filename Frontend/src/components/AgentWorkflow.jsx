import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppearanceContext from '../AppearanceContext';

import {
  LightOceanTheme,
  DarkNebulaTheme,
  EarthyForestTheme,
  SunsetGlowTheme,
  LavenderMistTheme,
  CloudySkyTheme,
} from './themes';

const themes = {
  Light: LightOceanTheme,
  Dark: DarkNebulaTheme,
  Forest: EarthyForestTheme,
  Sunset: SunsetGlowTheme,
  Lavender: LavenderMistTheme,
  Cloudy: CloudySkyTheme,
};

function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);
  const [error, setError] = useState(null);
  const [newWorkflow, setNewWorkflow] = useState({
    Issue: '',
    Custom_Workflow: '',
    Sub_Issue_Type: ''
  });

  const {
    themeName: contextThemeName,
    setThemeName,
  } = useContext(AppearanceContext);

  const [themeName, setLocalThemeName] = useState(contextThemeName);
  useEffect(() => {
    fetchWorkflows();
    fetchGlobalSettings();
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
        alert('Workflow created successfully!');
        fetchWorkflows();
        setNewWorkflow({
          Issue: '',
          Custom_Workflow: '',
          Sub_Issue_Type: ''
        });
      })
      .catch(error => {
        alert('Failed to create workflow. Error: ' + error.message);
        setError(error.message);
      });
  };

  const handleDeleteWorkflow = (issuesid) => {
    axios.delete(`http://localhost:3000/workflows/${issuesid}` , { withCredentials: true })
      .then(() => {
        alert('Workflow deleted successfully!');
        fetchWorkflows();
      })
      .catch(error => {
        alert('Error deleting Workflow' + error.message);
        setError(error.message);
      });
  };

  const fetchGlobalSettings = async () => {
    try {
      const globalSettingsResponse = await axios.get('http://localhost:3000/Appearance/', {
        withCredentials: true,
      });
      if (globalSettingsResponse.data.uniqueThemes.length > 0) {
        setLocalThemeName(globalSettingsResponse.data.uniqueThemes[0]);
        setThemeName(globalSettingsResponse.data.uniqueThemes[0]);
      }
    } catch (error) {
      console.error('Error fetching global appearance settings:', error);
    }
  };

  const selectedTheme = themes[themeName];

  const workflowTableStyle = {
    backgroundColor: selectedTheme.colors.background,
    color: selectedTheme.colors.text,
  };

  const workflowButtonStyle = {
    backgroundColor: selectedTheme.colors.primary,
    color: selectedTheme.colors.background,
  };

  return (
    <div className="container mx-auto p-8" style={workflowTableStyle}>
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
          style={workflowButtonStyle}
          className="p-2 rounded"
        >
          Create
        </button>
      </div>

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
                  className="hover:text-red-700"
                  style={workflowButtonStyle}
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
