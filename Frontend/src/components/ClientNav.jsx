// ClientNav.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCheck,
  AiOutlineHome,
  AiOutlineBell,
} from "react-icons/ai";
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

const ClientNav = () => {
  const { themeName: contextThemeName, logoPath: contextLogoPath, setThemeName, setLogoPath } = useContext(AppearanceContext);

  const [themeName, setLocalThemeName] = useState(contextThemeName);
  const [logoPath, setLocalLogoPath] = useState(contextLogoPath);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  // Mock notifications data for testing
  const mockNotifications = [
    { _id: '1', message: 'New ticket created', read: false },
    { _id: '2', message: 'Knowledge base updated', read: true },
    { _id: '3', message: 'Profile settings changed', read: false },
    // Add more mock notifications as needed
  ];

  // Set initial notifications when the component mounts
  useState(() => {
    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    fetchGlobalSettings();
  }, [themeName, logoPath]);

  // Filter unread notifications
  const unreadNotifications = notifications.filter(notification => !notification.read);

  // Handle checkbox change to mark notification as read
  const handleCheckboxChange = async (notificationId) => {
    // Update the state locally
    const updatedNotifications = notifications.map(notification => {
      if (notification._id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);

    // For testing purposes, log the notification ID and update the state on the server
    console.log('Marking notification as read:', notificationId);
  };

  const fetchGlobalSettings = async () => {
    try {
      const globalSettingsResponse = await axios.get('https://help-desk-ruddy.vercel.app/Appearance', { withCredentials: true });
      if (globalSettingsResponse.data.uniqueThemes.length > 0) {
        console.log(globalSettingsResponse);
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
              src={logoPath}
              alt="Help Desk Logo"
              className="h-full w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Help <span className="font-bold">Desk</span>
        </h1>

        {/* Right side */}
        <div className="flex items-center">
          {/* Notification Button */}
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
        <h2 className="text-2xl p-4">My Menu</h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {/* Home */}
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => navigate("/ClientHome")}
            >
              <AiOutlineHome size={20} className="mr-2" />
              Home
            </li>
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => navigate("/CreateTicket")}
            >
              <AiOutlinePlus size={25} className="mr-4" /> Create Ticket
            </li>
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => navigate("/ViewMyTickets")}
            >
              <AiOutlineCheck size={25} className="mr-4" /> View My Tickets
            </li>
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => navigate("/KnowledgeBase")}
            >
              <AiOutlineQuestionCircle size={25} className="mr-4" /> Knowledge
              Base
            </li>
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => navigate("/Settings")}
            >
              <AiOutlineSetting size={25} className="mr-4" /> Settings
            </li>
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => navigate("/Profile")}
            >
              <AiOutlineUser size={25} className="mr-4" /> Profile
            </li>
            
            {/* Logout Button */}
            <li
              onClick={() => {
                // Perform logout action here (e.g., clear session, remove tokens, etc.)
                // Then, redirect to the home page
                navigate('/');
              }}
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>

      {/* Notification Dropdown */}
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

export default ClientNav;
