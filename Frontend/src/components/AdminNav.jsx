import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { LightOceanTheme } from "./themes";

const AdminNav = () => {
  const [nav, setNav] = useState(false);
  const theme = LightOceanTheme;
  const navigate = useNavigate();

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
            {/* Replace the logo URL with your admin logo */}
            <img
              src="https://www.freepnglogos.com/uploads/administration-logo-png-12.png"
              alt="Admin Logo"
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
                onClick={() => navigate("/AssignRole")}
              >
                <AiOutlineUser size={25} className="mr-4" /> Assign Role
              </li>
              {/* Add more admin-specific menu items as needed */}
              <li 
                className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer" 
                onClick={() => navigate("/AdminSettings")}
              >
                <AiOutlineSetting size={25} className="mr-4" /> Admin Settings
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
