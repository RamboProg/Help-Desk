import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleUpdatePopup from './RoleUpdatePopup';

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // New state for filtered users
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRoleId, setNewRoleId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch users on component mount
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin/getUsers', { withCredentials: true });
      setUsers(response.data.users);
      setFilteredUsers(response.data.users); // Set filtered users initially to all users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const roleNames = {
    2: 'Manager',
    3: 'Support Agent',
    4: 'Client'
  };

  const getRoleName = (roleId) => {
    return roleNames[roleId] || 'Unknown';
  };

  const handleRoleChange = async () => {
    try {
      // Make API call to update user role
      const response = await axios.post('http://localhost:3000/api/v1/admin/assignRole', {
        userID: parseInt(selectedUser._id),
        roleID: parseInt(newRoleId)
      }, { withCredentials: true });

      if (response.data) {
        console.log('Role updated successfully');
        alert('Role updated successfully!');
      } else {
        console.error('Failed to update user role:', response.data.message);
        alert('Failed to update user role');
      }

      // Refresh the user list
      getUsers();
      // Close the pop-up
      setShowPopup(false);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleSearch = () => {
    // Filter users based on the search term
    const filtered = users.filter((user) => user.Username.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const resetSearch = () => {
    // Reset the search term and revert to the original list of users
    setSearchTerm('');
    setFilteredUsers(users);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1 style={{ color: '#333' }}>User Management</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor='search' style={{ marginRight: '10px', color: '#555' }}>
          Search Username:
        </label>
        <input
          type='text'
          id='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSearch} style={{ marginRight: '10px', padding: '8px', backgroundColor: '#4caf50', color: '#fff', border: 'none' }}>
          Search
        </button>
        <button onClick={resetSearch} style={{ padding: '8px', backgroundColor: '#ddd', color: '#333', border: 'none' }}>
          Reset
        </button>
      </div>
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
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td style={tableCellStyles}>{user.Email}</td>
              <td style={tableCellStyles}>{user.Username}</td>
              <td style={tableCellStyles}>{user.PhoneNumber}</td>
              <td style={tableCellStyles}>{getRoleName(user.RoleID)}</td>
              <td style={tableCellStyles}>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowPopup(true);
                  }}
                  style={{ backgroundColor: '#2196F3', color: '#fff', padding: '8px', border: 'none' }}
                >
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
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        />
      )}
    </div>
  );
};

const tableStyles = {
  borderCollapse: 'collapse',
  width: '80%',
  margin: 'auto'
};

const tableHeaderStyles = {
  border: '1px solid black',
  padding: '8px'
};

const tableCellStyles = {
  border: '1px solid black',
  padding: '8px'
};

export default AssignRole;
