import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminNav from './components/AdminNav';

const AdminLayout = ({children}) =>{
    const location = useLocation();
    const showNavbar = location.pathname ==='/AdminHome' || location.pathname === '/logs' || location.pathname === '/appearance' || location.pathname === '/AssignRole';

    return(
        <div>
            {showNavbar && <AdminLayout/>}
            {children}
        </div>
    );
};
export default AdminLayout;