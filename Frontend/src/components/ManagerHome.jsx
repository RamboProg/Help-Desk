// ManagerHome.jsx

import React from 'react';
import { LightOceanTheme } from './themes';

const ManagerHome = () => {
  const theme = LightOceanTheme;

  return (
    <div 
      className="bg-cover bg-center h-screen flex justify-center items-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      <div className='max-w-[1640px] mx-auto px-4 py-12 text-center bg-white bg-opacity-50 rounded-lg p-8'>
        <h1 className={`text-${theme.colors.primary} font-bold text-4xl mb-8`}>
          Welcome Back Manager!
        </h1>
        <p className={`text-${theme.colors.text} text-xl mb-4`}>
          Manager-specific content goes here.
        </p>
      </div>
    </div>
  );
};

export default ManagerHome;