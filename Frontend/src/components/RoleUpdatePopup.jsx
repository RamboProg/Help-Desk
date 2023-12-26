import React from "react";

// RoleUpdatePopup component with improved styles
const RoleUpdatePopup = ({ newRoleId, onUpdate, onClose, onRoleChange, style }) => {
  const popupStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const popupInnerStyles = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px", // Set the width as needed
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Add a subtle box shadow
    ...style, // Merge external styles
  };

  const labelStyles = {
    display: "block",
    marginBottom: "10px",
    color: "#333",
  };

  const selectStyles = {
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
    <div style={{ ...popupStyles, ...style }}>
      <div style={popupInnerStyles}>
        <h2 style={{ color: "#2196F3" }}>Update User Role</h2>
        <label htmlFor="roleSelect" style={labelStyles}>
          Select Role:
        </label>
        <select id="roleSelect" value={newRoleId} onChange={(e) => onUpdate(e.target.value)} style={selectStyles}>
          <option value="2">Manager</option>
          <option value="3">Support Agent</option>
          <option value="4">Client</option>
        </select>
        <br />
        <button onClick={onRoleChange} style={buttonStyles}>
          Update Role
        </button>
        <button onClick={onClose} style={cancelButtonStyles}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoleUpdatePopup;