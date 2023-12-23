// MainLayout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <div>
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default MainLayout;
