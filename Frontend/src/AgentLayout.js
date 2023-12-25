import React from 'react';
import { useLocation } from 'react-router-dom';
import AgentNav from './components/AgentNav';

const AgentLayout = ({children}) =>{
    const location = useLocation();
    const showNavbar = location.pathname ==='/AgentHome' || location.pathname === '/Tcikets';

    return(
        <div>
            {showNavbar && <AgentLayout/>}
            {children}
        </div>
    );
};
export default AgentLayout;