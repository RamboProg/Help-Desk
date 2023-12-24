import React, { useState } from 'react';
import axios from 'axios';

const AdminAppearance = () => {
  const [theme, setTheme] = useState('light');
  const [logoPath, setLogoPath] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/v1/editAppearance/', { theme, logoPath });
      alert('Customization updated successfully for all users');
    } catch (error) {
      console.error('Error updating appearance:', error);
    }
  };

  return (
    <div>
      <h2>Admin Appearance Customization</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {/* Your theme options */}
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            {/* Add other theme options as needed */}
          </select>
        </label>
        <br />
        <label>
          Logo URL:
          <input 
            type="text" 
            value={logoPath} 
            onChange={(e) => setLogoPath(e.target.value)} 
            placeholder="Enter logo URL" 
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AdminAppearance;
