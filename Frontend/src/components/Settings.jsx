import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineSetting, AiOutlineUser, AiOutlineHome, AiOutlineTool } from "react-icons/ai";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMFAEnabled] = useState(false);
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
      setMFATextColor(profileInfo.data.user.MFA_Enabled ? "green" : "red");
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match. Please try again.");
        return;
      }
  
      const response = await axios.put(
        "http://localhost:3000/api/v1/users/reset-password",
        {
          email: email,
          password: newPassword,
        },
        { withCredentials: true }
      );
  
      console.log(response.data.message);
      alert('Password Reset successfully!');
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

      setMFAEnabled(!mfaEnabled); // Toggle MFA status
      setMFATextColor(mfaEnabled ? "red" : "green");

      console.log(response.data.message);
    } catch (error) {
      console.error("Error setting MFA:", error.message);
    }
  };

  return (
    <div className="max-w-[1640px] mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 ml-4"
      >
        Go Back
      </button>

      <div className="p-8 rounded-lg shadow-md max-w-md mx-auto mt-8 bg-white">
        <h2 className="font-extrabold text-2xl mb-4">Reset Password</h2>
        <div className="flex items-center mb-4">
          <AiOutlineUser className="mr-2" />
          <label htmlFor="email" className="bg-transparent p-2 ml-2">
            {email}
          </label>
        </div>
        <div className="flex items-center mb-4">
          <AiOutlineSetting className="mr-2" />
          <input
            className="bg-transparent p-2 w-full focus:outline-none ml-2 border-b border-gray-500"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <AiOutlineSetting className="mr-2" />
          <input
            className="bg-transparent p-2 w-full focus:outline-none ml-2 border-b border-gray-500"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleResetPassword}
          className="bg-blue-500 text-white py-2 px-4 rounded-full w-full mb-4 focus:outline-none hover:bg-blue-600"
        >
          Reset Password
        </button>
      </div>

      <div className="p-8 rounded-lg shadow-md max-w-md mx-auto mt-8 bg-white">
        <h2 className="font-extrabold text-2xl mb-4">Multi-Factor Authentication</h2>
        <div className="flex items-center mb-4">
          <button
            onClick={handleSetMFA}
            className={`mfa-toggle-button bg-blue-500 text-white py-2 px-4 rounded-full mr-4 focus:outline-none`}
          >
            {mfaEnabled ? "Disable MFA" : "Enable MFA"}
          </button>
          <span className={`text-lg font-semibold text-${mfaTextColor}`}>
            {mfaEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
