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
    fetchGlobalSettings();
  });

  const handleThemeChange = async () => {
    try {
      await axios.post('http://localhost:3000/editAppearance/', { theme: themeName, logoPath }, { withCredentials: true });
      await fetchGlobalSettings();
      setThemeName(themeName);
      setLogoPath(logoPath);
      alert('Customization updated successfully for all users!');
    } catch (error) {
      console.error('Error updating appearance:', error);
      alert('Failed to update appearance. Please try again.');
    }
  };

  const fetchGlobalSettings = async () => {
    try {
      const globalSettingsResponse = await axios.get('http://localhost:3000/Appearance', { withCredentials: true });
      if (globalSettingsResponse.data.uniqueThemes.length > 0) {
        console.log('Global appearance settings:', globalSettingsResponse.data)
        setLocalThemeName(globalSettingsResponse.data.uniqueThemes[0]);
        setLocalLogoPath(globalSettingsResponse.data.uniqueLogoPaths[0]);
        setThemeName(globalSettingsResponse.data.uniqueThemes[0]);
        setLogoPath(globalSettingsResponse.data.uniqueLogoPaths[0]);
      }
    } catch (error) {
      console.error('Error fetching global appearance settings:', error);
    }
  };

  // const selectedTheme = themes[themeName];

  return (
    <div 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: themes[themeName].colors.background,
      color: themes[themeName].colors.text,
      padding: themes[themeName].spacing.md 
    }}
    >
      {/* Header */}
      <h1 
        style={{ 
          fontSize: '2.5em',  // Larger text size
          fontWeight: 'bold',  // Bold font weight
          marginBottom: '20px', 
          textAlign: 'center'
        }}
      >
        Appearance
      </h1>

      {/* Label and Dropdown for selecting theme */}
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="themeDropdown" style={{ marginBottom: '10px' }}>Selected Theme</label>
        <select 
          id="themeDropdown"
          style={{ 
            width: '200px',
            marginRight: '10px',
            backgroundColor: themes[themeName].colors.secondary,
            color: themes[themeName].colors.text,
            padding: themes[themeName].spacing.sm,
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

        {/* Label and Textbox for logoPath */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="logoPathInput" style={{ marginBottom: '10px' }}>Logo Image Path</label>
          <input 
            id="logoPathInput"
            style={{ 
              width: '200px',
              marginBottom: '20px',
              padding: themes[themeName].spacing.sm,
              borderRadius: '4px',
              border: `1px solid ${themes[themeName].colors.primary}`
            }}
            type="text" 
            placeholder="Enter logo URL"
            value={logoPath}
            onChange={(e) => setLocalLogoPath(e.target.value)}
          />
        </div>
      </div>

      {/* Button to update appearance */}
      <button 
        style={{ 
          padding: themes[themeName].spacing.sm,
          backgroundColor: themes[themeName].colors.primary,
          color: themes[themeName].colors.background,
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