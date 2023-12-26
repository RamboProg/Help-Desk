import React from 'react';
import { useLocation } from 'react-router-dom';
import AgentNav from './components/AgentNav';

const ManagerLayout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname === '/ManagerHome' || location.pathname === '/AgentIssuesCharts';

  return (
    <div>
      {showNavbar && <AgentNav />}
      {children}
    </div>
  );
};

export default ManagerLayout;
