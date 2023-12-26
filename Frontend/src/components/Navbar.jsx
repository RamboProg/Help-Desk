import React, { useState } from 'react';
import Login from './Login'; // Assuming you have a Login component
import { CloudySkyTheme, LavenderMistTheme , SunsetGlowTheme, EarthyForestTheme, DarkNebulaTheme, LightOceanTheme} from './themes'; // Assuming you want a default theme

const Navbar = () => {
const [nav, setNav] = useState(false)

  return (
    <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
        {/* Logo on the top left */}
        <div className='flex items-center h-12'> {/* Set a specific height for the container */}
      <img 
        src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" 
        alt="Help Desk Logo" 
        className="h-full w-auto"  // Set the height to 100% of its container
        style={{ objectFit: 'contain' }} // Ensures the image fits within its container
      /> 
    </div>
    <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
      Help <span className='font-bold'>Desk</span>
    </h1>

        {/* Login/Signup Button on the Very Right */}
        <div className='flex items-center'>
          <Login theme={theme} /> {/* Pass the theme as a prop to the Login component */}
        </div>
      </div>

      {/* Search Input */}
      <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search foods'
        />
      </div>
      {/* Cart button */}
      <button className='bg-black text-white hidden md:flex items-center py-2 rounded-full'>
        <BsFillCartFill size={20} className='mr-2' /> Cart
      </button>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      

      {/* Side drawer menu */}
      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
        <AiOutlineClose
            onClick={()=> setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          Best <span className='font-bold'>Eats</span>
        </h2>
        <nav>
            <ul className='flex flex-col p-4 text-gray-800'>
                <li className='text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4' /> Orders</li>
                <li className='text-xl py-4 flex'><MdFavorite size={25} className='mr-4' /> Favorites</li>
                <li className='text-xl py-4 flex'><FaWallet size={25} className='mr-4' /> Wallet</li>
                <li className='text-xl py-4 flex'><MdHelp size={25} className='mr-4' /> Help</li>
                <li className='text-xl py-4 flex'><AiFillTag size={25} className='mr-4' /> Promotions</li>
                <li className='text-xl py-4 flex'><BsFillSaveFill size={25} className='mr-4' /> Best Ones</li>
                <li className='text-xl py-4 flex'><FaUserFriends size={25} className='mr-4' /> Invite Friends</li>
            </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
