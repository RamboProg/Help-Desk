import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LightOceanTheme, DarkNebulaTheme, EarthyForestTheme, SunsetGlowTheme, LavenderMistTheme, CloudySkyTheme } from './themes';

const themes = {
  light: LightOceanTheme,
  dark: DarkNebulaTheme,
  forest: EarthyForestTheme,
  sunset: SunsetGlowTheme,
  lavender: LavenderMistTheme,
  cloudy: CloudySkyTheme
};

const Appearance = () => {
  const [themeName, setThemeName] = useState('light'); // Default to 'light'
  const [logoPath, setLogoPath] = useState('');

  useEffect(() => {
    fetchGlobalSettings();
  }, []);

  const handleThemeChange = async () => {
    try {
      // Make a POST request to update the appearance settings for all users
      await axios.post('http://localhost:3000/api/v1/editAppearance/', { theme: themeName, logoPath });
      
      // Fetch the updated appearance settings after updating
      await fetchGlobalSettings();
      
      alert('Customization updated successfully for all users!');
    } catch (error) {
      console.error('Error updating appearance:', error);
      alert('Failed to update appearance. Please try again.');
    }
  };
  
  const fetchGlobalSettings = async () => {
    try {
      const globalSettingsResponse = await axios.get('http://localhost:3000/api/v1/Appearance/');
      if (globalSettingsResponse.data.uniqueThemes.length > 0) {
        setThemeName(globalSettingsResponse.data.uniqueThemes[0]);
        setLogoPath(globalSettingsResponse.data.uniqueLogoPaths[0]);
      }
    } catch (error) {
      console.error('Error fetching global appearance settings:', error);
    }
  };


  const selectedTheme = themes[themeName];

  return (
    <div>
      {/* Dropdown to select theme */}
      <select value={themeName} onChange={(e) => setThemeName(e.target.value)}>
        {Object.keys(themes).map((themeKey) => (
          <option key={themeKey} value={themeKey}>
            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
          </option>
        ))}
      </select>

      {/* Textbox for logoPath */}
      <input 
        type="text" 
        placeholder="Enter logo URL"
        value={logoPath}
        onChange={(e) => setLogoPath(e.target.value)}
      />

      {/* Button to update appearance */}
      <button onClick={handleThemeChange}>Update Appearance</button>
    </div>
  );
};

export default Appearance;
