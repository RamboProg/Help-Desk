// ManagerNavbar.jsx

import React from 'react';
// import { Link } from 'react-router-dom';
import { LightOceanTheme } from './themes';

const ManagerNavbar = () => {
  const theme = LightOceanTheme;

  return (
    <div className={`bg-${theme.colors.background} text-${theme.colors.text}`}>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Logo on the top left */}
        <div className="flex items-center h-12">
          <img
            src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
            alt="Manager Desk Logo"
            className="h-full w-auto"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Help <span className="font-bold">Desk</span>
        </h1>

        {/* Navigation links */}
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ManagerNavbar;
