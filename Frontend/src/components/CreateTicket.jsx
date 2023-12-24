import React, { useState } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TicketForm = ({ theme }) => {
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState("");
  const [subIssueType, setSubIssueType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/tickets",
        {
          description,
          Issue_Type: issueType,
          Sub_Issue_Type: subIssueType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful ticket creation
      console.log(response.data);

      // Redirect or perform any other actions after successful ticket creation
    } catch (error) {
      console.error("Ticket creation failed:", error);
    }
  };

  return (
    <div>
      <h2>Create a Ticket</h2>
      {/* Description Input */}
      <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
        <AiOutlineUser size={25} />
        <input
          className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Issue Type Dropdown */}
      <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
        <select
          className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          required
        >
          <option value="">Select Issue Type</option>
          <option value="network">Network</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
        </select>
      </div>

      {/* Sub Issue Type Dropdown */}
      <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
        <select
          className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
          value={subIssueType}
          onChange={(e) => setSubIssueType(e.target.value)}
          required
        >
          <option value="">Select Sub Issue Type</option>
          {/* Add options based on the selected Issue Type */}
          {issueType === "hardware" && (
            <>
              <option value="Desktops">Desktops</option>
              <option value="Laptops">Laptops</option>
              <option value="Printers">Printers</option>
              {/* Add other hardware sub-issue types */}
            </>
          )}
          {issueType === "software" && (
            <>
              <option value="Operating system">Operating system</option>
              <option value="Application software">Application software</option>
              {/* Add other software sub-issue types */}
            </>
          )}
          {issueType === "network" && (
            <>
              <option value="Email issues">Email issues</option>
              <option value="Internet connection problems">Internet connection problems</option>
              {/* Add other network sub-issue types */}
            </>
          )}
        </select>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full w-full mb-4`}
      >
        Create Ticket
      </button>
    </div>
  );
};

export default TicketForm;
