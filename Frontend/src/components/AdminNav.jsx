import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlinePicture,
  AiOutlineFileText,
  AiOutlineHome,
  AiOutlineBell
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchGlobalSettings();

    // Mock notifications data for testing
    const mockNotifications = [
      { _id: '1', message: 'New email received', read: false },
      { _id: '2', message: 'Meeting at 2 PM', read: true },
      { _id: '3', message: 'Reminder: Complete tasks', read: false },
    ];
    setNotifications(mockNotifications);
  });

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

  // const selectedTheme = themes[themeName];

  const navStyles = {
    backgroundColor: themes[themeName].colors.background,
    color: themes[themeName].colors.text
  };

  const menuItemStyles = {
    backgroundColor: themes[themeName].colors.secondary,
    color: themes[themeName].colors.text,
    padding: themes[themeName].spacing.sm,
    borderRadius: '4px',
    border: `1px solid ${themes[themeName].colors.primary}`
  };

  const handleCheckboxChange = async (notificationId) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification._id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
    console.log('Marking notification as read:', notificationId);
  };

  const unreadNotifications = notifications.filter(notification => !notification.read);

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

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2" style={{ color: themes[themeName].colors.secondary }}>
          Help <span className="font-bold" style={{ color: themes[themeName].colors.primary }}>Desk</span>
        </h1>

        <div className="flex items-center">
          <div className="relative ml-4">
            <AiOutlineBell
              size={30}
              onClick={() => setShowNotifications(!showNotifications)}
              className="cursor-pointer"
            />
            {unreadNotifications.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1">
                {unreadNotifications.length}
              </div>
            )}
          </div>
        </div>
      </div>

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
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => navigate('/AssignRole')}
              style={menuItemStyles}
            >
              <AiOutlineFileText size={20} className="mr-2" />
              Assign Role
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

      {showNotifications && (
        <div className="absolute top-16 right-0 mt-2 bg-white w-64 border rounded-lg shadow-md">
          <div className="p-2 border-b">Notifications</div>
          <div className="p-2">
            {unreadNotifications.map(notification => (
              <div key={notification._id} className="flex items-center justify-between py-1">
                <div
                  className={`flex-1 ${notification.read ? 'text-gray-500' : 'text-black'}`}
                >
                  {notification.message}
                </div>
                <input
                  type="checkbox"
                  checked={false} // Set this to the appropriate value based on the notification's read status
                  onChange={() => handleCheckboxChange(notification._id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNav;
