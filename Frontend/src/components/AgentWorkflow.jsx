import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { LightOceanTheme } from "./themes";
import axios from "axios";

const AgentWorkflows = () => {
  const [nav, setNav] = useState(false);
  const theme = LightOceanTheme;
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [newIssueType, setNewIssueType] = useState("");
  const [newSubIssueType, setNewSubIssueType] = useState("");

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workflows/", { withCredentials: true });
        const data = await response.json();
        setWorkflows(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkflows();
  }, []);

  const handleDeleteWorkflow = (id) => {
    // Delete workflow on the server and update the state
    fetch("http://localhost:3000/api/v1/workflows/65899a0dff0e5b06e998c3a8", { method: "DELETE" }, { withCredentials: true })
      .then((response) => response.json())
      .then((deletedWorkflow) => {
        setWorkflows((prevWorkflows) =>
          prevWorkflows.filter(
            (workflow) => workflow._id !== deletedWorkflow._id
          )
        );
      })
      .catch((error) => console.error("Error deleting workflow:", error));
  };

  const handleCreateWorkflow = async () => {
    // Create a new workflow on the server and update the state
    try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/workflows",
          {
            Custom_Workflow: newWorkflowName,
            Issue: newIssueType,
            Sub_Issue_Type: newSubIssueType,
          },
          { withCredentials: true }
        );
        console.log(response.data.message);
        setWorkflows((prevWorkflows) => [...prevWorkflows, response.data]);
        // Clear the input fields after creating the workflow
        setNewWorkflowName("");
        setNewIssueType("");
        setNewSubIssueType("");
      } catch (error) {
        console.log(error);
      }

    // fetch("http://localhost:3000/api/v1/workflows", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(
    //     {
    //       Custom_Workflow: newWorkflowName,
    //       Issue: newIssueType,
    //       Sub_Issue_Type: newSubIssueType,
    //     },
    //     { withCredentials: true }
    //   ),
    // })
    //   .then((response) => response.json())
    //   .then((createdWorkflow) => {
    //     setWorkflows((prevWorkflows) => [...prevWorkflows, createdWorkflow]);
    //     // Clear the input fields after creating the workflow
    //     setNewWorkflowName("");
    //     setNewIssueType("");
    //     setNewSubIssueType("");
    //   })
    //   .catch((error) => console.error("Error creating workflow:", error));
  };

  return (
    <div>
      {/* Navbar Container */}
      <div
        className={`bg-${theme.colors.background} text-${theme.colors.text}`}
      >
        <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
          {/* Left side */}
          <div className="flex items-center">
            <div onClick={() => setNav(!nav)} className="cursor-pointer">
              <AiOutlineMenu size={30} />
            </div>
            {/* Logo on the top left */}
            <div className="flex items-center h-12">
              <img
                src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
                alt="Help Desk Logo"
                className="h-full w-auto"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
            Help <span className="font-bold">Desk</span>
          </h1>

          {/* Side drawer menu */}
          <div
            className={
              nav
                ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
            }
          >
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            <h2 className="text-2xl p-4">Agent Menu</h2>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                {/* Home */}
                <li
                  className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                  onClick={() => navigate("/AgentHome")}
                >
                  <AiOutlineHome size={20} className="mr-2" />
                  Home
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Content Container with Background Image */}
      <div
        className={`bg-cover`}
        style={{ backgroundImage: `url('./path/to/your/image.jpg')` }}
      >
        <div className="max-w-[1640px] mx-auto p-4">
          {/* Your content here */}
          {/* Table of workflows */}
          <h1>Workflows</h1>
          <table border={1}>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Sub Issue</th>
                <th>Workflow</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the data to create table rows */}
              {workflows.map((workflow) => (
                <tr key={workflow._id}>
                  {/* Populate table cells with data */}
                  <td>{workflow.Issue}</td>
                  <td>{workflow.Sub_Issue_Type}</td>
                  <td>{workflow.Custom_Workflow}</td>
                  <td>
                    <button onClick={() => handleDeleteWorkflow(workflow._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <input
              type="text"
              placeholder="Workflow Description"
              value={newWorkflowName}
              onChange={(e) => setNewWorkflowName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Issue Type"
              value={newIssueType}
              onChange={(e) => setNewIssueType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sub Issue Type"
              value={newSubIssueType}
              onChange={(e) => setNewSubIssueType(e.target.value)}
            />
            <button onClick={handleCreateWorkflow}>Create Workflow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentWorkflows;