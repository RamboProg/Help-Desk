import React from 'react';
import { useLocation } from 'react-router-dom';
import AgentNav from './components/AgentNav';

const AgentLayout = ({children}) =>{
    const location = useLocation();
    const showNavbar = location.pathname ==='/AgentHome' || location.pathname === '/ViewTickets'|| location.pathname === '/AgentWorkflow';

    return(
        <div>
            {showNavbar && <AgentNav/>}
            {children}
        </div>
    );
};
export default AgentLayout;