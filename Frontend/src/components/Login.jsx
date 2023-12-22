import React, { useState } from "react";
import axios from "axios";
import OTPPopup from "./OTPPopup"; // Adjust the path based on your project structure
import { AiOutlineClose, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = ({ theme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleVerifyOTP = async (enteredOTP) => {
    try {
      const verifyOTPResponse = await axios.post("http://localhost:3000/verifyOTP", {
        email,
        code: enteredOTP,
      });

      console.log(verifyOTPResponse.data);

      if (verifyOTPResponse.data.message === "Multi-factor authentication email sent successfully") {
        handleRoleBasedNavigation();
      } else {
        setMessage("MFA verification failed");
      }
    } catch (error) {
      setMessage(`OTP verification failed: ${error.message}`);
    } finally {
      setShowOTPPopup(false);
    }
  };

  const handleAction = async () => {
    setMessage("");
  
    try {
      // Ensure email is defined
      if (!email) {
        setMessage("Email is required");
        return;
      }
  
      console.log(email);
      const mfaResponse = await axios.get("http://localhost:3000/getMFA" ,{
        email
      }); 
  
      console.log("MFA Response:", mfaResponse.data);
  
      // if (mfaResponse.data) {
      //   const sendOTPResponse = await axios.post("http://localhost:3000/sendOTP", {
      //     email,
      //   });
  
      //   console.log("Send OTP Response:", sendOTPResponse.data);
  
      //   setShowOTPPopup(true);
      
        const loginResponse = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
  
        console.log("Login Response:", loginResponse.data);
  
        handleRoleBasedNavigation(loginResponse);
  
        setShowLogin(false);
      
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  };
  

  const handleRoleBasedNavigation = (loginResponse) => {
    // Make sure 'loginResponse.data.Role_ID' is correct based on your server response
    switch (loginResponse.data.Role_ID) {
      case 1:
        navigate("/AdminHome");
        break;
      case 2:
        navigate("/ManagerHome");
        break;
      case 3:
        navigate("/AgentHome");
        break;
      case 4:
        navigate("/ClientHome");
        break;
      default:
        console.log("invalid role");
        break;
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowLogin(!showLogin)}
        className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full mt-4`}
      >
        {isLogin ? "Login" : "Sign up"}
      </button>

      {showLogin && (
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-${theme.colors.background}/80 z-20 flex justify-center items-center`}
        >
          <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative">
              <AiOutlineClose
                onClick={() => setShowLogin(!showLogin)}
                size={30}
                className="absolute top-4 right-4 cursor-pointer"
              />
              <h2 className="text-2xl mb-4">
                {isLogin ? "Welcome back to" : "Join"}{" "}
                <span className="font-bold">Help Desk</span>
              </h2>

              <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                <AiOutlineUser size={25} />
                <input
                  className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail((e.target.value))}
                  required
                />
              </div>

              <div className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}>
                <AiOutlineLock size={25} />
                <input
                  className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                  type="password"
                  placeholder="Password"
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
                    type="text"
                    placeholder="Username"
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
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}

              <button
                onClick={handleAction}
                className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full w-full mb-4`}
              >
                {isLogin ? "Login" : "Signup"}
              </button>

              <p className="text-center">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className={`text-${theme.colors.primary} cursor-pointer`}
                >
                  {isLogin ? "Signup" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {showOTPPopup && <OTPPopup onVerifyOTP={handleVerifyOTP} />}
    </div>
  );
};

export default Login;
