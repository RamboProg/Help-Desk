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
  const [mfaEnabled, setMFAEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleToggleMFA = async () => {
    try {
      console.log("lol")
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/setMFA",
        { withCredentials: true }
      );
      console.log("lol2")
      setMFAEnabled(!mfaEnabled);

      //refresh page
      navigate("/Settings");

      console.log(response.data.message);
    } catch (error) {
      console.error("Error toggling MFA:", error.message);
    }
  };

  return (
    <div className="flex">
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

        <div className="checkbox-container">
          <input
            id="mfaToggle"
            className="checkbox-input"
            type="checkbox"
            checked={mfaEnabled}
            onChange={handleToggleMFA}
          />
          <label htmlFor="mfaToggle" className="checkbox-label">
            Multi-Factor Authentication
          </label>
        </div>
      </div>
      <style>
        {`
    /* Style for the checkbox container */
    .checkbox-container {
      display: flex;
      align-items: center;
    }

    /* Style for the checkbox input */
    .checkbox-input {
      margin-right: 8px; /* Adjust spacing */
    }

    /* Style for the checkbox label */
    .checkbox-label {
      user-select: none;
    }
  `}
      </style>
    </div>
  );
};

export default Settings;