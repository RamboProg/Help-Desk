import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

const Login = ({ theme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // to toggle between login and signup

  return (
    <div>
      {/* Login/Signup Button */}
      <button 
        onClick={() => setShowLogin(!showLogin)} 
        className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full mt-4`}
      >
        {isLogin ? 'Login' : 'Sign up'}
      </button>

      {/* Login/Signup Overlay */}
      {showLogin && (
        <div className={`fixed top-0 left-0 w-full h-screen bg-${theme.colors.background}/80 z-20 flex justify-center items-center`}>
          <div className='flex justify-center items-center h-full'>
            {/* Login/Signup Box */}
            <div className='bg-white p-8 rounded-lg shadow-lg w-[400px] relative'>
            <AiOutlineClose
              onClick={() => setShowLogin(!showLogin)}
              size={30}
              className='absolute top-4 right-4 cursor-pointer'
            />
              <h2 className='text-2xl mb-4'>
                {isLogin ? 'Welcome back to' : 'Join'} <span className='font-bold'>Help Desk</span>
              </h2>
              {/* Email Input */}
              <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                <AiOutlineUser size={25} />
                <input
                  className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                  type='text'
                  placeholder='Email'
                />
              </div>
              {/* Password Input */}
              <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                <AiOutlineLock size={25} />
                <input
                  className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                  type='password'
                  placeholder='Password'
                />
              </div>
              {/* Signup Password Confirm */}
              {!isLogin && (
                <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                  <AiOutlineLock size={25} />
                  <input
                    className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                    type='password'
                    placeholder='Confirm Password'
                  />
                </div>
              )}
              {/* Action Button */}
              <button 
                className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full w-full mb-4`}
            >
                {isLogin ? 'Login' : 'Signup'}
            </button>
              {/* Toggle between Login and Signup */}
              <p className='text-center'>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className={`text-${theme.colors.primary} cursor-pointer`}
                >
                  {isLogin ? 'Signup' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
