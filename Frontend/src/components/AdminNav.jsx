<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlinePicture,
  AiOutlineFileText,
} from 'react-icons/ai';
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
=======
// AdminNav.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineUser, AiOutlineHome } from 'react-icons/ai';
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
import { LightOceanTheme } from './themes';
import axios from 'axios';

const Manager = () => {
  const theme = LightOceanTheme;
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/manager/getAgents');
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

<<<<<<< HEAD
    fetchData();
  }, []);

  const handleGenerateReport = async (agentId) => {
    try {
      // Add your logic to fetch chart data based on the agentId
      const response = await axios.get(`/api/v1/reports/tickets/TicketAnalytics/Status/${agentId}`);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <div 
      className="bg-cover bg-center h-screen flex justify-center items-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      <div className='max-w-[1640px] mx-auto px-4 py-12 text-center bg-white bg-opacity-50 rounded-lg p-8'>
        <h1 className={`text-${theme.colors.primary} font-bold text-4xl mb-8`}>
          Welcome to Manager Dashboard
        </h1>

        <p className={`text-${theme.colors.text} text-xl mt-8`}>
          Manage and oversee the operations of your Help Desk.
        </p>
        <p className={`text-${theme.colors.text} text-lg mb-4`}>
          Access tools and features to administer users, handle tickets, and analyze support data.
        </p>

        {/* Table Section */}
        <div className="mt-8">
          <h2 className={`text-${theme.colors.primary} font-bold text-2xl mb-4`}>
            Support Agents
          </h2>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Agent Name</th>
                <th className="border border-gray-300 p-2">Pref Type</th>
                <th className="border border-gray-300 p-2">Average Rating</th>
                <th className="border border-gray-300 p-2">Ticket Count</th>
                <th className="border border-gray-300 p-2">Active Tickets</th>
                <th className="border border-gray-300 p-2">Generate Report</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td className="border border-gray-300 p-2">{agent.Username}</td>
                  <td className="border border-gray-300 p-2">{agent.Pref_Type}</td>
                  <td className="border border-gray-300 p-2">{agent.Average_Rating}</td>
                  <td className="border border-gray-300 p-2">{agent.Ticket_Count}</td>
                  <td className="border border-gray-300 p-2">{agent.Active_Tickets}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className={`bg-${theme.colors.primary} text-white px-4 py-2 rounded`}
                      onClick={() => handleGenerateReport(agent._id)}
                    >
                      Generate Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
=======
  return (
    <div className={`bg-${theme.colors.background} text-${theme.colors.text}`}>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Left side */}
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          {/* Logo on the top left */}
          <div className="flex items-center h-12">
            <img
              src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
              alt="Help Desk Logo"
              className="h-full w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Admin <span className="font-bold">Dashboard</span>
        </h1>

        {/* Side drawer menu */}
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">Admin Menu</h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li 
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer" 
                onClick= {() => navigate("/AdminHome")}
              >
                <AiOutlineHome size={25} className="mr-4" /> Home
              </li>
              <li 
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer" 
                onClick={() => navigate("/AssignRole")}
              >
                <AiOutlinePlus size={25} className="mr-4" /> Assign Role
              </li>
              <li
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"              
                onClick={()=> navigate("/Profile")}
                >
                <AiOutlinePlus size ={25} className="mr-4"/> Profile
              </li>
              <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"              
              onClick={()=> navigate("/Settings")}
              >
                <AiOutlinePlus size ={25} className="mr-4"/> Settings
              </li>
            </ul>
          </nav>
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
        </div>
      </div>
    </div>
  );
};

export default Manager;