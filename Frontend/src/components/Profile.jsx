import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineTool } from "react-icons/ai";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId); // Log the initial state

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/profile",
          { withCredentials: true }
        );

        setUser(response.data.user);
        setNewEmail(response.data.user.Email);
        setNewUsername(response.data.user.Username);
        setNewPhoneNumber(response.data.user.PhoneNumber);
        setUserId(response.data.user._id);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, [userId]); // Add an empty dependency array to run the effect only once

  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          newEmail,
          newUsername,
          newPhoneNumber,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Profile update failed:", error.message);
    }
  };

  return (
    <div className="flex">
      <div className="bg-gray-800 text-white h-screen w-1/6 p-5">
        <ul className="space-y-4">
          <li className="flex items-center">
            <AiOutlineTool className="mr-2" />
            <button
              onClick={() => navigate("/AssignRole")}
              className="hover:underline focus:outline-none">
              AssignRole
            </button>
          </li>
          <li className="flex items-center">
            <AiOutlineTool className="mr-2" />
            <button
              onClick={() => navigate("/Settings")}
              className="hover:underline focus:outline-none">
              Settings
            </button>
          </li>
        </ul>
      </div>
      <div className="max-w-[1640px] m-auto px-4 py-12 flex-grow ">
        <form
          onSubmit={handleUpdateProfile}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Email:
            </label>
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Username:
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Phone Number:
            </label>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;