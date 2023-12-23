import React from "react";

// RoleUpdatePopup component with inline CSS styles
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
    ...style, // Merge external styles
  };

  return (
    <div style={{ ...popupStyles, ...style }}>
      <div style={popupInnerStyles}>
        <h2>Update User Role</h2>
        <label htmlFor="roleSelect">Select Role:</label>
        <select id="roleSelect" value={newRoleId} onChange={(e) => onUpdate(e.target.value)}>
          <option value="2">Manager</option>
          <option value="3">Support Agent</option>
          <option value="4">Client</option>
        </select>
        <br />
        <button onClick={onRoleChange}>Update Role</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RoleUpdatePopup;
