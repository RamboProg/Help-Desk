import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlinePicture,
  AiOutlineFileText,
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

const AdminNav = () => {
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

  const navStyles = {
    backgroundColor: selectedTheme.colors.background,
    color: selectedTheme.colors.text
  };

  const menuItemStyles = {
    backgroundColor: selectedTheme.colors.secondary,
    color: selectedTheme.colors.text,
    padding: selectedTheme.spacing.sm,
    borderRadius: '4px',
    border: `1px solid ${selectedTheme.colors.primary}`
  };

  return (
    <div style={navStyles}>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          <div className="flex items-center h-12">
            <img
              src={logoPath}
              alt="Admin Desk Logo"
              className="h-full w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2" style={{ color: selectedTheme.colors.secondary }}>
          Help <span className="font-bold" style={{ color: selectedTheme.colors.primary }}>Desk</span>
        </h1>

        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
          }
          style={menuItemStyles}
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">Admin Menu</h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/AdminHome')}
                style={menuItemStyles}
              >
                <AiOutlineHome size={20} className="mr-2" />
                Home
              </li>
              {/* Similarly apply styles to other list items */}
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/AssignRole')}
                style={menuItemStyles}
              >
                <AiOutlineHome size={25} className="mr-4" /> Home
              </li>
              <li 
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer" 
                onClick={() => navigate("/AssignRole")}
              >
                <AiOutlinePlus size={25} className="mr-4" /> Assign Role
              </li>
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/Appearance')}
                style={menuItemStyles}
              >
                <AiOutlinePicture size={20} className="mr-2" />
                Appearance
              </li>
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/logs')}
                style={menuItemStyles}
              >
                <AiOutlineFileText size={20} className="mr-2" />
                Logs
              </li>
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/profile')}
                style={menuItemStyles}
              >
                <AiOutlineUser size={20} className="mr-2" />
                Profile
              </li>
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

export default AdminNav;
