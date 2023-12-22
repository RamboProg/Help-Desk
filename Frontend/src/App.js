// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import ClientLayout from './ClientLayout';
import Login from './components/Login';
import Homepage from './components/Homepage';
import ClientHome from './components/ClientHome';
import AdminHome from './components/AdminHome';
import ManagerHome from './components/ManagerHome';
import AgentHome from './components/AgentHome';
import KnowledgeBase from './components/KnowledgeBase';
import Settings from './components/Settings';
import Profile from './components/Profile';

function App() {
  return (
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
          element={<MainLayout><AdminHome /></MainLayout>}
        />
        <Route
          path="/ManagerHome"
          element={<MainLayout><ManagerHome /></MainLayout>}
        />
        <Route
          path="/AgentHome"
          element={<MainLayout><AgentHome /></MainLayout>}
        />
        <Route
          path="/KnowledgeBase"
          element={<ClientLayout><KnowledgeBase /></ClientLayout>}
        />
        <Route
          path="/Settings"
          element={<ClientLayout><Settings /></ClientLayout>}
        />
        <Route
          path="/Profile"
          element={<ClientLayout><Profile /></ClientLayout>}
        />
      </Routes>
    </Router>
  );
}

export default App;
