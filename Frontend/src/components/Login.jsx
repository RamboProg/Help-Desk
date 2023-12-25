import React, { useState } from 'react';
import axios from 'axios';
import OTPPopup from './OTPPopup';
import { AiOutlineClose, AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Login = ({ theme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleVerifyOTP = async (enteredOTP) => {
    try {
      const verifyOTPResponse = await axios.post(
        'http://localhost:3000/verifyOTP',
        {
          email,
          code: enteredOTP
        },
        { withCredentials: true }
      );

      if (verifyOTPResponse.data.message === 'Multi-factor authentication email sent successfully') {
        const loginResponse = await axios.post(
          'http://localhost:3000/api/v1/login',
          {
            email,
            password
          },
          { withCredentials: true }
        );

        handleRoleBasedNavigation(loginResponse);
        setShowLogin(false);
      } else {
        setMessage('MFA verification failed');
      }
    } catch (error) {
      setMessage(`OTP verification failed: ${error.message}`);
    } finally {
      setShowOTPPopup(false);
    }
  };
  const handleAction = async () => {
    console.log('Starting handleAction...'); // <-- Add this log
  
    setMessage('');
    if (isLogin) {
      try {
        if (!email) {
          setMessage('Email is required');
          return;
        }
  
        console.log(`Fetching MFA for email: ${email}`); // <-- Add this log
        const mfaResponse = await axios.get(`http://localhost:3000/getMFA?email=${email}`);
  
        console.log('MFA Response:', mfaResponse.data); // <-- Add this log
  
        if (mfaResponse.data) {
          console.log('MFA is enabled for the user.'); // <-- Add this log
          const sendOTPResponse = await axios.post(
            'http://localhost:3000/sendOTP',
            { email },
          );
  
          console.log('Send OTP Response:', sendOTPResponse.data); // <-- Add this log
  
          if (sendOTPResponse.data.message === 'Multi-factor authentication email sent successfully') {
            setShowOTPPopup(true);
          }
        } else {
          console.log('MFA is NOT enabled for the user.'); // <-- Add this log
          const loginResponse = await axios.post(
            'http://localhost:3000/api/v1/login',
            { email, password },
            { withCredentials: true }
          );
  
          console.log('Login Response:', loginResponse.data); // <-- Add this log
  
          handleRoleBasedNavigation(loginResponse);
          setShowLogin(false);
        }
      } catch (error) {
        console.error('Error in handleAction:', error); // <-- Add this log
        setMessage(`Login failed: ${error.message}`);
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/register',
          { email, password, username, phoneNumber },
          {
            withCredentials: true
          }
        );

        const mfaResponse = await axios.get(`http://localhost:3000/api/v1/users/getMFA?email=${email}`, { withCredentials: true });

        if (mfaResponse.data) {
          const sendOTPResponse = await axios.post(
            'http://localhost:3000/api/v1/users/sendOTP',
            {
              email
            },
            { withCredentials: true }
          );

          if (sendOTPResponse.data.message === 'Multi-factor authentication email sent successfully') {
            setShowOTPPopup(true);
          }
        } else {
          // Handle login without OTP for cases where MFA is not enabled
          const loginResponse = await axios.post(
            'http://localhost:3000/api/v1/login',
            {
              email,
              password
            },
            { withCredentials: true }
          );

          handleRoleBasedNavigation(loginResponse);

          setShowLogin(false);
        }

        // Handle successful signup
        console.log(response.data);
      } catch (error) {
        // Handle signup error
        console.error('Signup failed:', error);
      }
    }
  };

  const handleRoleBasedNavigation = (loginResponse) => {
    if (loginResponse.data && loginResponse.data.user.RoleID) {
      switch (loginResponse.data.user.RoleID) {
        case 1:
          navigate('/AdminHome');
          break;
        case 2:
          navigate('/ManagerHome');
          break;
        case 3:
          navigate('/AgentHome');
          break;
        case 4:
          navigate('/ClientHome');
          break;
        default:
          console.log('Invalid role');
          break;
      }
    } else {
      console.log('Invalid login response format');
    }
  };

  return (
    <div>
      <button onClick={() => setShowLogin(!showLogin)} className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full mt-4`}>
        {isLogin ? 'Login' : 'Sign up'}
      </button>

      {showLogin && (
        <div className={`fixed top-0 left-0 w-full h-screen bg-${theme.colors.background}/80 z-20 flex justify-center items-center`}>
          <div className='flex justify-center items-center h-full'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-[400px] relative'>
              <AiOutlineClose onClick={() => setShowLogin(!showLogin)} size={30} className='absolute top-4 right-4 cursor-pointer' />
              <h2 className='text-2xl mb-4'>
                {isLogin ? 'Welcome back to' : 'Join'} <span className='font-bold'>Help Desk</span>
              </h2>

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
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                  <AiOutlineUser size={25} />
                  <input
                    className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                  <AiOutlineUser size={25} />
                  <input
                    className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                    type='text'
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}

              <button onClick={handleAction} className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full w-full mb-4`}>
                {isLogin ? 'Login' : 'Signup'}
              </button>

              <p className='text-center'>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span onClick={() => setIsLogin(!isLogin)} className={`text-${theme.colors.primary} cursor-pointer`}>
                  {isLogin ? 'Signup' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {showOTPPopup && <OTPPopup onVerifyOTP={handleVerifyOTP} onClose={() => setShowOTPPopup(false)} />}
    </div>
  );
};

export default Login;