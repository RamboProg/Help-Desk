import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose, AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

const ForgotPasswordPopup = ({ theme, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const resetPasswordResponse = await axios.post(
        'http://localhost:3000/api/v1/users/reset-password',
        { email, password },
        { withCredentials: true }
      );

      if (resetPasswordResponse.data.message === 'Password reset successfully') {
        setMessage('Password reset successfully');
      } else {
        setMessage('Password reset failed');
      }
    } catch (error) {
      setMessage(`Password reset failed: ${error.message}`);
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-screen bg-${theme.colors.background}/80 z-20 flex justify-center items-center`}>
      <div className='flex justify-center items-center h-full'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-[400px] relative'>
          <AiOutlineClose onClick={onClose} size={30} className='absolute top-4 right-4 cursor-pointer' />
          <h2 className='text-2xl mb-4'>Forgot Password</h2>

          <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
            <AiOutlineUser size={25} />
            <input
              className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
            <AiOutlineLock size={25} />
            <input
              className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
              type='password'
              placeholder='New Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button onClick={handleForgotPassword} className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full w-full mb-4`}>
            Reset Password
          </button>

          <p className='text-center'>
            Remember your password?{' '}
            <span onClick={onClose} className={`text-${theme.colors.primary} cursor-pointer`}>
              Login
            </span>
          </p>
          <p className={`text-${theme.colors.primary} text-center`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
