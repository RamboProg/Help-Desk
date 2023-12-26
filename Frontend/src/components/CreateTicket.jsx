import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/tickets", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Server Response:", response.data);
      
      
      console.log("Server Response:", response.data);
      
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Error creating ticket:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only update the description field
    if (name === "description") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      // Update validSubIssueTypes based on the selected Issue_Type
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        Sub_Issue_Type: "", // Reset Sub_Issue_Type when Issue_Type changes
      }));

      switch (value) {
        case "hardware":
          setValidSubIssueTypes(['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment', 'other']);
          break;
        case "software":
          setValidSubIssueTypes(['Operating system', 'Application software', 'Custom software', 'Integration issues', 'other']);
          break;
        case "network":
          setValidSubIssueTypes(['Email issues', 'Internet connection problems', 'Website errors', 'other']);
          break;
        default:
          setValidSubIssueTypes([]);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <div className={`max-w-[1640px] mx-auto bg-gray-200 bg-opacity-50 rounded-lg p-8 flex`}>
          <div className="w-1/3 pr-8">
            <img 
              src="https://img.freepik.com/free-vector/flat-people-asking-questions-illustration_23-2148901520.jpg?w=996&t=st=1703180818~exp=1703181418~hmac=25d978773da4d75d494eebaeb3a84d8d87badb403309206e1174101eb499ab39" 
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;