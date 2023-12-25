// MainLayout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import ManagerNav from './components/ManagerNav';

const ManagerLayout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname === '/ManagerHome';

  return (
    <div>
      {showNavbar && <ManagerNav />}
      {children}
    </div>
  );
};

export default ManagerLayout;