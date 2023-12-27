import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RoleUpdatePopup from './RoleUpdatePopup';
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

const AssignRole = () => {
  const {
    themeName: contextThemeName,
    setThemeName,
  } = useContext(AppearanceContext);

  const [themeName, setLocalThemeName] = useState(contextThemeName);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRoleId, setNewRoleId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGlobalSettings();
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin/getUsers', { withCredentials: true });
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
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

      getUsers();
      setShowPopup(false);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleSearch = () => {
    const filtered = users.filter((user) => user.Username.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilteredUsers(users);
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

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: selectedTheme.backgroundColor }}>
      <h1 style={{ color: selectedTheme.textColor }}>User Management</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor='search' style={{ marginRight: '10px', color: selectedTheme.textColorSecondary }}>
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
          style={{ marginRight: '10px', padding: '8px', border: `1px solid ${selectedTheme.borderColor}` }}
        />
        <button onClick={handleSearch} style={{ marginRight: '10px', padding: '8px', backgroundColor: selectedTheme.buttonColor, color: selectedTheme.buttonTextColor, border: `1px solid ${selectedTheme.buttonBorderColor}` }}>
          Search
        </button>
        <button onClick={resetSearch} style={{ padding: '8px', backgroundColor: selectedTheme.buttonSecondaryColor, color: selectedTheme.buttonSecondaryTextColor, border: `1px solid ${selectedTheme.buttonSecondaryBorderColor}` }}>
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
                  style={{ backgroundColor: selectedTheme.actionButtonColor, color: selectedTheme.actionButtonTextColor, padding: '8px', border: `1px solid ${selectedTheme.actionButtonBorderColor}` }}
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
          style={{ backgroundColor: selectedTheme.popupBackgroundColor }}
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
