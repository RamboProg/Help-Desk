import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMFAEnabled] = useState();
  const [mfaTextColor, setMFATextColor] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info when component mounts
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const profileInfo = await axios.get(
        "http://localhost:3000/api/v1/users/profile",
        { withCredentials: true }
      );

      setEmail(profileInfo.data.user.Email);
      setMFAEnabled(profileInfo.data.user.MFA_Enabled);
      setUserId(profileInfo.data.user._id);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/reset-password",
        {
          email: email,
          password: newPassword,
        },
        { withCredentials: true }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Password reset failed:", error.message);
    }
  };

  const handleSetMFA = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/setMFA",
        {
          id: userId, // Replace with the user's ID
        },
        { withCredentials: true }
      );

      setMFAEnabled(mfaEnabled);
      setMFATextColor(mfaEnabled ? "green" : "red");

      console.log(response.data.message);
    } catch (error) {
      console.error("Error setting MFA:", error.message);
    }
  };

  return (
    <div className="flex">
      <div className="bg-gray-800 text-white h-screen w-1/6 p-5">
        <ul className="space-y-4">
          <li className="flex items-center">
            <AiOutlineHome className="mr-2" />
            <button
              onClick={() => navigate("/AdminHome")}
              className="hover:underline focus:outline-none">
              Home
            </button>
          </li>
          <li className="flex items-center">
            <AiOutlineTool className="mr-2" />
            <button
              onClick={() => navigate("/AssignRole")}
              className="hover:underline focus:outline-none">
              AssignRole
            </button>
          </li>
          <li className="flex items-center">
            <AiOutlineUser className="mr-2" />
            <button
              onClick={() => navigate("/Profile")}
              className="hover:underline focus:outline-none">
              Profile
            </button>
          </li>
        </ul>
      </div>
      <div className="max-w-[1640px] m-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-8"></h1>

        <div className="p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="font-extrabold text-2xl mb-4">Reset Password</h2>
          <div className="flex items-center justify-center bg-white rounded-full mb-4 p-2">
            <AiOutlineUser className="mr-2" />
            <label htmlFor="email" className="bg-transparent p-2 ml-2">
              {email}
            </label>
          </div>
          <div className="flex items-center bg-white rounded-full mb-4 p-2">
            <AiOutlineSetting className="mr-2" />
            <input
              className="bg-transparent p-2 w-full focus:outline-none ml-2"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white rounded-full mb-4 p-2">
            <AiOutlineSetting className="mr-2" />
            <input
              className="bg-transparent p-2 w-full focus:outline-none ml-2"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="bg-blue-500 text-white py-2 px-4 rounded-full w-full mb-4">
            Reset Password
          </button>
        </div>

        <div className="p-8 rounded-lg shadow-md max-w-md mx-auto mt-8">
          <h2 className="font-extrabold text-2xl mb-4">
            Multi-Factor Authentication
          </h2>
          <div
            className={`flex items-center justify-center bg-white rounded-full mb-4 p-2 text-${mfaTextColor}`}>
            {mfaEnabled ? "Enabled" : "Disabled"}
            <button
              onClick={handleSetMFA}
              className="bg-blue-500 text-white py-2 px-4 rounded-full ml-4">
              Toggle MFA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
