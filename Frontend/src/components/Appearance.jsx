import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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

const Appearance = () => {
  const {
    themeName: contextThemeName,
    logoPath: contextLogoPath,
    setThemeName,
    setLogoPath,
  } = useContext(AppearanceContext);

  const [themeName, setLocalThemeName] = useState(contextThemeName);
  const [logoPath, setLocalLogoPath] = useState(contextLogoPath);

  useEffect(() => {
    fetchGlobalSettings();
  }, []); // Empty dependency array to run the effect only once

  const handleThemeChange = async () => {
    try {
      await axios.post(
        'https://help-desk-ruddy.vercel.app/editAppearance/',
        { theme: themeName, logoPath },
        { withCredentials: true }
      );
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
      const globalSettingsResponse = await axios.get('https://help-desk-ruddy.vercel.app/Appearance/', {
        withCredentials: true,
      });
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: selectedTheme.colors.background,
        color: selectedTheme.colors.text,
        padding: selectedTheme.spacing.md,
        fontFamily: 'Arial, sans-serif', // Adjust the font family
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: '2.5em', // Larger text size
          fontWeight: 'bold', // Bold font weight
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Appearance
      </h1>

      {/* Label and Dropdown for selecting theme */}
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="themeDropdown" style={{ marginBottom: '10px', fontSize: '1.2em', fontWeight: 'bold' }}>
          Selected Theme
        </label>
        <select
          id="themeDropdown"
          style={{
            width: '200px',
            marginBottom: '20px',
            backgroundColor: selectedTheme.colors.secondary,
            color: selectedTheme.colors.text,
            padding: selectedTheme.spacing.sm,
            borderRadius: '4px',
            fontSize: '1em',
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
          <label htmlFor="logoPathInput" style={{ marginBottom: '10px', fontSize: '1.2em', fontWeight: 'bold' }}>
            Logo Image Path
          </label>
          <input
            id="logoPathInput"
            style={{
              width: '200px',
              marginBottom: '20px',
              padding: selectedTheme.spacing.sm,
              borderRadius: '4px',
              border: `1px solid ${selectedTheme.colors.primary}`,
              fontSize: '1em',
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
          padding: selectedTheme.spacing.sm,
          backgroundColor: selectedTheme.colors.primary,
          color: selectedTheme.colors.background,
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2em',
          fontWeight: 'bold',
        }}
        onClick={handleThemeChange}
      >
        Update Appearance
      </button>
    </div>
  );
};

export default Appearance;
