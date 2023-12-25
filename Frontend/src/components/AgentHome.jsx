import React from 'react';
import { LightOceanTheme } from './themes'; // Ensure you have this import path correct

const AgentHome = () => {
  const theme = LightOceanTheme; // Using the theme you provided
  
  return (
    <div 
      className="bg-cover bg-center h-screen flex justify-center items-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" // Your background image URL
      }}
    >
      <div className='max-w-[1640px] mx-auto px-4 py-12 text-center bg-white bg-opacity-50 rounded-lg p-8'>
        <h1 className={`text-${theme.colors.primary} font-bold text-4xl mb-8`}>
          Welcome Back Agent!
        </h1>
        <p className={`text-${theme.colors.text} text-xl mb-4`}>
          Checkout the latest tickets and respond to them. And don't forget to check your chats.
        </p>
      </div>
    </div>
  );
};

export default AgentHome;