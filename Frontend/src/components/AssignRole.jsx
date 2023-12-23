import React, { useState, useEffect } from "react";
import axios from "axios";
import RoleUpdatePopup from "./RoleUpdatePopup";

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRoleId, setNewRoleId] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch users on component mount
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/admin/getUsers");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = async () => {
    try {
      console.log("Changing role...");
      console.log("Selected User:", selectedUser);
      console.log("New Role ID:", newRoleId);
  
      // Make API call to update user role
      const response = await axios.post("http://localhost:3000/api/v1/admin/assignRole", {
        userID: parseInt(selectedUser._id),
        roleID: parseInt(newRoleId),
      });
      console.log("API Response:", response.data);
  
      if (response.data) {
        console.log("Role updated successfully");
      } else {
        console.error("Failed to update user role:", response.data.message);
      }
  
      // Refresh the user list
      getUsers();
      // Close the pop-up
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Management</h1>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={tableHeaderStyles}>Email</th>
            <th style={tableHeaderStyles}>Username</th>
            <th style={tableHeaderStyles}>Phone Number</th>
            <th style={tableHeaderStyles}>Role</th>
            <th style={tableHeaderStyles}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={tableCellStyles}>{user.Email}</td>
              <td style={tableCellStyles}>{user.Username}</td>
              <td style={tableCellStyles}>{user.PhoneNumber}</td>
              <td style={tableCellStyles}>{user.RoleID}</td>
              <td style={tableCellStyles}>
                <button onClick={() => { setSelectedUser(user); setShowPopup(true); }}>
                  Change Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <RoleUpdatePopup
          newRoleId={newRoleId}
          onUpdate={(value) => setNewRoleId(value)}
          onClose={() => setShowPopup(false)}
          onRoleChange={handleRoleChange}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        />
      )}
    </div>
  );
};

const tableStyles = {
  borderCollapse: "collapse",
  width: "80%",
  margin: "auto",
};

const tableHeaderStyles = {
  border: "1px solid black",
};

const tableCellStyles = {
  border: "1px solid black",
};

export default AssignRole;
