import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppearanceContext from '../AppearanceContext'; // Assuming you have this context
import { 
  LightOceanTheme, 
  DarkNebulaTheme, 
  EarthyForestTheme, 
  SunsetGlowTheme, 
  LavenderMistTheme, 
  CloudySkyTheme 
} from './themes';

const themes = {
  light: LightOceanTheme,
  dark: DarkNebulaTheme,
  forest: EarthyForestTheme,
  sunset: SunsetGlowTheme,
  lavender: LavenderMistTheme,
  cloudy: CloudySkyTheme,
};

const Appearance = () => {
  const { themeName: contextThemeName, logoPath: contextLogoPath, setThemeName, setLogoPath } = useContext(AppearanceContext);
  
  const [themeName, setLocalThemeName] = useState(contextThemeName);
  const [logoPath, setLocalLogoPath] = useState(contextLogoPath);

  useEffect(() => {
    // Fetch initial appearance settings when the component mounts
    fetchGlobalSettings();
  }, []);

  const handleThemeChange = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/editAppearance/', { theme: themeName, logoPath });
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
        setLocalThemeName(globalSettingsResponse.data.uniqueThemes[0]);
        setLocalLogoPath(globalSettingsResponse.data.uniqueLogoPaths[0]);
        setThemeName(globalSettingsResponse.data.uniqueThemes[0]);
        setLogoPath(globalSettingsResponse.data.uniqueLogoPaths[0]);
      }
    } catch (error) {
      console.error('Error fetching global appearance settings:', error);
    }
  };

  const selectedTheme = themes[themeName];

  return (
    <div style={{ 
      backgroundColor: selectedTheme.colors.background,
      color: selectedTheme.colors.text,
      padding: selectedTheme.spacing.md 
    }}>
      {/* Dropdown to select theme */}
      <select 
        style={{ 
          backgroundColor: selectedTheme.colors.secondary,
          color: selectedTheme.colors.text,
          padding: selectedTheme.spacing.sm,
          borderRadius: '4px' 
        }}
        value={themeName} 
        onChange={(e) => setLocalThemeName(e.target.value)}
      >
        {Object.keys(themes).map((themeKey) => (
          <option key={themeKey} value={themeKey}>
            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
          </option>
        ))}
      </select>

      {/* Textbox for logoPath */}
      <input 
        style={{ 
          padding: selectedTheme.spacing.sm,
          borderRadius: '4px',
          border: `1px solid ${selectedTheme.colors.primary}`
        }}
        type="text" 
        placeholder="Enter logo URL"
        value={logoPath}
        onChange={(e) => setLocalLogoPath(e.target.value)}
      />

      {/* Button to update appearance */}
      <button 
        style={{ 
          padding: selectedTheme.spacing.sm,
          backgroundColor: selectedTheme.colors.primary,
          color: selectedTheme.colors.background,
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={handleThemeChange}
      >
        Update Appearance
      </button>
    </div>
  );
};

export default Appearance;
