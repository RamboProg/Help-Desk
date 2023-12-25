// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import ClientLayout from './ClientLayout';
import AdminLayout from './AdminLayout';
import AgentLayout from './AgentLayout';
import ManagerLayout from './ManagerLayout';
import Login from './components/Login';
import Homepage from './components/Homepage';
import ClientHome from './components/ClientHome';
import AdminHome from './components/AdminHome';
import ManagerHome from './components/ManagerHome';
import AgentHome from './components/AgentHome';
import KnowledgeBase from './components/KnowledgeBase';
import Logs from './components/Logs';
import Appearance from './components/Appearance';
// import CreateTicket from './components/CreateTicket';
import { AppearanceContextProvider } from './AppearanceContext'; // Updated import

function App() {
  return (
    <AppearanceContextProvider>   
     <Router>
      <Routes>
        <Route
          path="/"
          element={<MainLayout><Homepage /></MainLayout>}
        />
        <Route
          path="/login"
          element={<MainLayout><Login /></MainLayout>}
        />
        <Route
          path="/ClientHome"
          element={<ClientLayout><ClientHome /></ClientLayout>}
        />
        <Route
          path="/AdminHome"
          element={<AdminLayout><AdminHome /></AdminLayout>}
        />
        <Route
          path="/ManagerHome"
          element={<ManagerLayout><ManagerHome /></ManagerLayout>}
        />
        <Route
          path="/AgentHome"
          element={<AgentLayout><AgentHome /></AgentLayout>}
        />
        <Route
          path="/KnowledgeBase"
          element={<ClientLayout><KnowledgeBase /></ClientLayout>}
        />
        <Route
          path="/logs"
          element={<AdminLayout><Logs /></AdminLayout>}
        />
        <Route
          path="/Appearance"
          element={<AdminLayout><Appearance /></AdminLayout>}
        />
                {/* <Route
          path="/CreateTicket"
          element={<ClientLayout><CreateTicket /></ClientLayout>}
        /> */}
      </Routes>

      
    </Router>
    </AppearanceContextProvider>


  );
}

export default App;