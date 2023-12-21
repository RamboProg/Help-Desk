import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUserFriends, FaUserCircle, FaWallet } from "react-icons/fa"; // Importing FaUserCircle for profile icon
import { MdFavorite, MdHelp } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LightOceanTheme } from "./themes";

const ClientNav = () => {
  const [nav, setNav] = useState(false);
  const theme = LightOceanTheme;

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Left side */}
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          {/* Logo on the top left */}
          <div className="flex items-center h-12">
            {" "}
            {/* Set a specific height for the container */}
            <img
              src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
              alt="Help Desk Logo"
              className="h-full w-auto" // Set the height to 100% of its container
              style={{ objectFit: "contain" }} // Ensures the image fits within its container
            />
          </div>
        </div>

        {/* Logo on the top left */}
        <div className="flex items-center h-12"></div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Help <span className="font-bold">Desk</span>
        </h1>

        {/* Side drawer menu */}
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">
            Best <span className="font-bold">Eats</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li className="text-xl py-4 flex">
                <TbTruckDelivery size={25} className="mr-4" /> Orders
              </li>
              <li className="text-xl py-4 flex">
                <MdFavorite size={25} className="mr-4" /> Favorites
              </li>
              <li className="text-xl py-4 flex">
                <FaWallet size={25} className="mr-4" /> Wallet
              </li>
              <li className="text-xl py-4 flex">
                <MdHelp size={25} className="mr-4" /> Help
              </li>
              <li className="text-xl py-4 flex">
                <FaUserFriends size={25} className="mr-4" /> Invite Friends
              </li>
              {/* Profile Option */}
              <li className="text-xl py-4 flex">
                <FaUserCircle size={25} className="mr-4" /> Profile
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ClientNav;
