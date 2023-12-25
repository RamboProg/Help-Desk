// AdminLayout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminNav from './components/AdminNav';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const showNavbar = location.pathname === '/AdminHome' || location.pathname === '/logs' || location.pathname === '/Appearance';

    return (
        <div>
            {showNavbar && <AdminNav />}
            {children}
        </div>
    );
};
export default AdminLayout;
