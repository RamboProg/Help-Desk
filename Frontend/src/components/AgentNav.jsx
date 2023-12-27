import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineReload,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineHome,
} from 'react-icons/ai';
import { AppearanceContext } from '../AppearanceContext';
import axios from 'axios';

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

const AgentNav = () => {
  const { themeName: contextThemeName, logoPath: contextLogoPath, setThemeName, setLogoPath } = useContext(AppearanceContext);
  
  const [themeName, setLocalThemeName] = useState(contextThemeName);
  const [logoPath, setLocalLogoPath] = useState(contextLogoPath);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchGlobalSettings();
  }, [themeName]);

  const fetchGlobalSettings = async () => {
    try {
      const globalSettingsResponse = await axios.get('http://localhost:3000/Appearance', { withCredentials: true });
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

  // const navStyles = {
  //   backgroundColor: selectedTheme.colors.background,
  //   color: selectedTheme.colors.text
  // };

  const menuItemStyles = {
    backgroundColor: selectedTheme.colors.secondary,
    color: selectedTheme.colors.text,
    padding: selectedTheme.spacing.md,
    borderRadius: '4px',
  };

  return (
    <div style={{ backgroundColor: selectedTheme.colors.background, color: selectedTheme.colors.text }}>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Left side */}
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          {/* Logo on the top left */}
          <div className="flex items-center h-12">
            <img
              src={logoPath}
              alt="Help Desk Logo"
              className="h-full w-auto"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Help <span className="font-bold">Desk</span>
        </h1>

        {/* Side drawer menu */}
        <div
          className={
            nav
              ? 'fixed top-0 left-0 w-[300px] h-screen z-10 duration-300 shadow-lg'
              : 'fixed top-0 left-[-100%] w-[300px] h-screen z-10 duration-300 shadow-lg'
          }
          style={{ backgroundColor: selectedTheme.colors.background, color: selectedTheme.colors.text }}
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">Agent Menu</h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              {/* Home */}
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/AgentHome')}
                style={menuItemStyles}
              >
                <AiOutlineHome size={20} className="mr-2" />
                Home
              </li>
              {/* Tickets */}
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/ViewTickets')}
                style={menuItemStyles}
              >
                <AiOutlineFileText size={20} className="mr-2" />
                Tickets
              </li>
              {/* Workflows */}
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/AgentWorkflow')}
                style={menuItemStyles}
              >
                <AiOutlineReload size={20} className="mr-2" />
                Workflows
              </li>
              {/* Profile */}
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/profile')}
                style={menuItemStyles}
              >
                <AiOutlineUser size={20} className="mr-2" />
                Profile
              </li>
              {/* Settings */}
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/settings')}
                style={menuItemStyles}
              >
                <AiOutlineSetting size={20} className="mr-2" />
                Settings
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AgentNav;
