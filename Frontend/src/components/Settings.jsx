import React, { useState, useEffect } from 'react';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import axios from 'axios';

const Settings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mfaEnabled, setMFAEnabled] = useState();
  const [mfaTextColor, setMFATextColor] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState();

  useEffect(() => {
    // Fetch user info when component mounts
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const profileInfo = await axios.get('http://localhost:3000/api/v1/users/profile', { withCredentials: true });

      setEmail(profileInfo.data.user.Email);
      setMFAEnabled(profileInfo.data.user.MFA_Enabled);
      setUserId(profileInfo.data.user._id);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3000/api/v1/users/reset-password',
        {
          email: email,
          password: newPassword
        },
        { withCredentials: true }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error('Password reset failed:', error.message);
    }
  };

  const handleSetMFA = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/setMFA',
        {
          id: userId // Replace with the user's ID
        },
        { withCredentials: true }
      );

      setMFAEnabled(mfaEnabled);
      setMFATextColor(mfaEnabled ? 'green' : 'red');

      console.log(response.data.message);
    } catch (error) {
      console.error('Error setting MFA:', error.message);
    }
  };

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='font-bold text-4xl text-center mb-8'>Settings</h1>

      <div className='p-8 rounded-lg shadow-md max-w-md mx-auto'>
        <h2 className='font-extrabold text-2xl mb-4'>Reset Password</h2>
        <div className='flex items-center justify-center bg-white rounded-full mb-4 p-2'>
          <AiOutlineMail size={25} />
          <label htmlFor='email' className='bg-transparent p-2 ml-2'>
            {email}
          </label>
        </div>
        <div className='flex items-center bg-white rounded-full mb-4 p-2'>
          <AiOutlineLock size={25} />
          <input
            className='bg-transparent p-2 w-full focus:outline-none ml-2'
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className='flex items-center bg-white rounded-full mb-4 p-2'>
          <AiOutlineLock size={25} />
          <input
            className='bg-transparent p-2 w-full focus:outline-none ml-2'
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handleResetPassword} className='bg-blue-500 text-white py-2 px-4 rounded-full w-full mb-4'>
          Reset Password
        </button>
      </div>

      <div className='p-8 rounded-lg shadow-md max-w-md mx-auto mt-8'>
        <h2 className='font-extrabold text-2xl mb-4'>Multi-Factor Authentication</h2>
        <div className={`flex items-center justify-center bg-white rounded-full mb-4 p-2 text-${mfaTextColor}`}>
          {mfaEnabled ? 'Enabled' : 'Disabled'}
          <button onClick={handleSetMFA} className='bg-blue-500 text-white py-2 px-4 rounded-full ml-4'>
            Toggle MFA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
