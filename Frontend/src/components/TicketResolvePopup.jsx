// TicketResolvePopup.js
import React, { useState } from "react";
import axios from "axios";

const TicketResolvePopup = ({ isOpen, onClose, ticketId, onResolve }) => {
  const [resolutionDetails, setResolutionDetails] = useState("");

  const handleResolveSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/agent/tickets/close/${ticketId}`, {
        status: "Closed",
        resolutionDetails: resolutionDetails,
      });

      if (response.data) {
        console.log("Ticket closed successfully");
        // Close the popup and trigger the parent component's onResolve callback
        onClose();
        onResolve();
      } else {
        console.error("Failed to close ticket:", response.data.message);
      }
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  };

  const popupStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const popupInnerStyles = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  };

  const labelStyles = {
    display: "block",
    marginBottom: "10px",
    color: "#333",
  };

  const textareaStyles = {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    boxSizing: "border-box",
  };

  const buttonStyles = {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    marginRight: "10px",
    cursor: "pointer",
  };

  const cancelButtonStyles = {
    backgroundColor: "#ddd",
    color: "#333",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    isOpen && (
      <div style={popupStyles}>
        <div style={popupInnerStyles}>
          <h2 style={{ color: "#2196F3" }}>Resolve Ticket</h2>
          <label htmlFor="resolutionDetails" style={labelStyles}>
            Resolution Details:
          </label>
          <textarea
            id="resolutionDetails"
            value={resolutionDetails}
            onChange={(e) => setResolutionDetails(e.target.value)}
            placeholder="Enter resolution details..."
            style={textareaStyles}
          />
          <br />
          <button onClick={handleResolveSave} style={buttonStyles}>
            Confirm
          </button>
          <button onClick={onClose} style={cancelButtonStyles}>
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default TicketResolvePopup;
