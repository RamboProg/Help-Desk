import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import Login from './Login'; // Assuming you have a Login component
import { CloudySkyTheme, LavenderMistTheme , SunsetGlowTheme, EarthyForestTheme, DarkNebulaTheme, LightOceanTheme} from './themes'; // Assuming you want a default theme

const Navbar = ({ isLoggedIn }) => {
  const [nav, setNav] = useState(false);
  const theme = LightOceanTheme; // Using the default light theme

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

      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
