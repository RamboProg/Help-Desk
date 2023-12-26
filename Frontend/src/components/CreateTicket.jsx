import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { LightOceanTheme } from "./themes";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    Issue_Type: "default",
    Sub_Issue_Type: "",
    description: "",
  });

  const [validSubIssueTypes, setValidSubIssueTypes] = useState([]);
  const [workflowResponse, setWorkflowResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.Issue_Type === "default" ||
      formData.Sub_Issue_Type.trim() === "" ||
      formData.description.trim() === ""
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/tickets",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server Response:", response.data);
      alert("Ticket created successfully!");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        Sub_Issue_Type: "",
      }));

      switch (value) {
        case "hardware":
          setValidSubIssueTypes([
            "Desktops",
            "Laptops",
            "Printers",
            "Servers",
            "Networking equipment",
            "other",
          ]);
          break;
        case "software":
          setValidSubIssueTypes([
            "Operating system",
            "Application software",
            "Custom software",
            "Integration issues",
            "other",
          ]);
          break;
        case "network":
          setValidSubIssueTypes([
            "Email issues",
            "Internet connection problems",
            "Website errors",
            "other",
          ]);
          break;
        default:
          setValidSubIssueTypes([]);
      }
    }
  };

  useEffect(() => {
    const fetchWorkflow = async () => {
      if (formData.Issue_Type !== "default") {
        try {
          const response = await axios.get(`http://localhost:3000/workflows/${formData.Issue_Type}` , { withCredentials: true });
          setWorkflowResponse(response.data.Custom_Workflow);
        } catch (error) {
          console.error("Error fetching workflow:", error);
          setWorkflowResponse("Failed to fetch workflow. Please try again later.");
        }
      } else {
        setWorkflowResponse("");
      }
    };

    fetchWorkflow();
  }, [formData.Issue_Type]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <div className={`max-w-[1640px] mx-auto bg-gray-200 bg-opacity-50 rounded-lg p-8 flex`}>
          <div className="w-1/3 pr-8">
            <img
              src="https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899174.jpg?w=1380&t=st=1703599026~exp=1703599626~hmac=73f223ce6fcbfe2db7282b50aeb152b046702091d447294f52a731f70e4ba1cf"
              alt="People asking questions"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className={`text-${LightOceanTheme.colors.primary} font-extrabold text-4xl mb-8 border-b-4 border-${LightOceanTheme.colors.primary} pb-4`}>
              Create a New Ticket
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="mb-4">
                Issue Type:
                <select
                  name="Issue_Type"
                  value={formData.Issue_Type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="default">default</option>
                  <option value="network">Network</option>
                  <option value="software">Software</option>
                  <option value="hardware">Hardware</option>
                </select>
              </label>
              <label className="mb-4">
                Sub Issue Type:
                <select
                  name="Sub_Issue_Type"
                  value={formData.Sub_Issue_Type}
                  onChange={(e) => setFormData({ ...formData, Sub_Issue_Type: e.target.value })}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Sub Issue Type</option>
                  {validSubIssueTypes.map((subIssueType) => (
                    <option key={subIssueType} value={subIssueType}>
                      {subIssueType}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mb-4">
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </label>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                Create Ticket
              </button>
            </form>

            {/* Display the workflowResponse if it's not empty */}
            {workflowResponse && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Automated Workflow:</h3>
                <textarea
                  value={workflowResponse}
                  readOnly
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  rows={4}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
