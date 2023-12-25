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
  
  // // Use context to get the theme and logo path
  // const { themeName, logoPath } = useContext(AppearanceContext);
  // const theme = themes[themeName];

  useEffect(() => {
    // Fetch appearance settings when the component mounts or whenever it needs to update
    fetchGlobalSettings();
  }, []);

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
const selectedLogo = logoPath;
  return (
    <div className={`bg-${selectedTheme.colors.background} text-${selectedTheme.colors.text}`}>
     
      
      
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Left side */}
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          {/* Logo on the top left */}
          <div className="flex items-center h-12">
            <img
              src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
              alt="Help Desk Logo"
              className="h-full w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Admin <span className="font-bold">Dashboard</span>
        </h1>

        {/* Side drawer menu */}
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">Admin Menu</h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              {/* Home */}
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/AdminHome')}
              >
                <AiOutlineHome size={20} className="mr-2" />
                Home
              </li>
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/AssignRole')}
              >
                <AiOutlineHome size={25} className="mr-4" /> Home
              </li>
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                onClick={() => navigate('/Appearance')}
              >
                <AiOutlinePlus size={25} className="mr-4" /> Assign Role
              </li>
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"              
                onClick={()=> navigate("/Profile")}
                >
                <AiOutlinePlus size ={25} className="mr-4"/> Profile
              </li>
              <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"              
              onClick={()=> navigate("/Settings")}
              >
                <AiOutlinePlus size ={25} className="mr-4"/> Settings
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
