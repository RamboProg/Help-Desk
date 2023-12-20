import React, { useState } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const Login = ({ theme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // State variables to store form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Function to handle login/signup
  const handleAction = async () => {
    if (isLogin) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        // Handle successful login (e.g., store token, redirect user)
        console.log(response.data);
      } catch (error) {
        // Handle login error
        console.error("Login failed:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/register",
          { email, password, username, phoneNumber }, {
            headers: {
              'Content-Type': 'application/json',
            },
         }, {
  headers: {
    'Content-Type': 'application/json',
  },
});
        // Handle successful signup
        console.log(response.data);
      } catch (error) {
        // Handle signup error
        console.error("Signup failed:", error);
      }
    }
  };

  return (
    <div>
      {/* Login/Signup Button */}
      <button
        onClick={() => setShowLogin(!showLogin)}
        className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full mt-4`}
      >
        {isLogin ? "Login" : "Sign up"}
      </button>

      {/* Login/Signup Overlay */}
      {showLogin && (
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-${theme.colors.background}/80 z-20 flex justify-center items-center`}
        >
          <div className="flex justify-center items-center h-full">
            {/* Login/Signup Box */}
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
              {/* Email Input */}
              <div
                className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}
              >
                <AiOutlineUser size={25} />
                <input
                  className={`bg-transparent p-2 w-full focus:outline-none ml-2 text-${theme.colors.text}`}
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div
                className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}
              >
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

              {/* Signup Username Input */}
              {!isLogin && (
                <div
                  className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}
                >
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

              {/* Signup Phone Number Input */}
              {!isLogin && (
                <div
                  className={`flex items-center bg-${theme.colors.background} rounded-full mb-4 p-2`}
                >
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

              {/* Action Button */}
              <button
  onClick={handleAction}               className={`bg-${theme.colors.primary} text-${theme.colors.text} py-2 px-4 rounded-full w-full mb-4`}
              >
                {isLogin ? "Login" : "Signup"}
              </button>
              {/* Toggle between Login and Signup */}
              <p className="text-center">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
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
    </div>
  );
};

export default Login;
