import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import Login from './Login'; // Assuming you have a Login component
import { CloudySkyTheme, LavenderMistTheme , SunsetGlowTheme, EarthyForestTheme, DarkNebulaTheme, LightOceanTheme} from './themes'; // Assuming you want a default theme

import { useNavigate } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineMessage,
  AiOutlineReload,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineHome, // <-- Import the Home icon
} from 'react-icons/ai';
import { LightOceanTheme } from './themes';
const Navbar = ({ isLoggedIn }) => {

  const AgentNav = () => {
    const [nav, setNav] = useState(false);
    const theme = LightOceanTheme; // Using the default light theme

    return (
      <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
        <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
          {/* Logo on the top left */}
          <div className='flex items-center h-12'> {/* Set a specific height for the container */}
        <img 
          src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" 
          alt="Help Desk Logo" 
          className="h-full w-auto"  // Set the height to 100% of its container
          style={{ objectFit: 'contain' }} // Ensures the image fits within its container
        /> 
      </div>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
        Help <span className='font-bold'>Desk</span>
      </h1>

          {/* Side drawer menu */}
          <div
            className={
              nav
                ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg'
                : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 shadow-lg'
            }
          >
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            <h2 className="text-2xl p-4">Agent Menu</h2>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                {/* Tickets */}
                <li
                  className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                  onClick={() => navigate('/ViewTickets')}
                >
                  <AiOutlineFileText size={20} className="mr-2" />
                  Tickets
                </li>
                {/* Chats */}
                <li
                  className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                  onClick={() => navigate('/ViewChats')}
                >
                  <AiOutlineMessage size={20} className="mr-2" />
                  Chats
                </li>
                {/* Workflows with circular arrow icon */}
                <li
                  className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                  onClick={() => navigate('/workflows')}
                >
                  <AiOutlineReload size={20} className="mr-2" />
                  Workflows
                </li>
                {/* Profile */}
                <li
                  className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  <AiOutlineUser size={20} className="mr-2" />
                  Profile
                </li>
                {/* Settings */}
                <li
                  className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                  onClick={() => navigate('/settings')}
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
};

export default Navbar;