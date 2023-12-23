// ClientLayout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import ClientNav from './components/ClientNav';

const ClientLayout = ({ children }) => {
    const location = useLocation();
    const showNavbar = location.pathname === '/ClientHome'; //|| location.pathname === '/login';

    return (
        <div>
            {showNavbar && <ClientNav />}
            {children}
        </div>
    );
};

export default ClientLayout;
