import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { LightOceanTheme } from './themes';

const ManagerNavbar = () => {
  const [nav, setNav] = useState(false);
  const theme = LightOceanTheme;

  return (
    <div className={`bg-${theme.colors.background} text-${theme.colors.text}`}>
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
              alt="Manager Desk Logo"
              className="h-full w-auto"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Help <span className="font-bold">Desk</span>
        </h1>

        {/* Navigation links */}
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {/* Add your other navigation links here if needed */}
          </ul>
        </nav>

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
          <h2 className="text-2xl p-4">Manager Menu</h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              {/* Profile */}
              <li className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer">
                <Link to="/manager/profile" className="flex items-center">
                  <AiOutlineUser size={20} className="mr-2" />
                  Profile
                </Link>
              </li>
              {/* Settings */}
              <li className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer">
                <Link to="/manager/settings" className="flex items-center">
                  <AiOutlineSetting size={20} className="mr-2" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ManagerNavbar;
