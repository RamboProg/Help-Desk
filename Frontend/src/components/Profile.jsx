import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineTool, AiOutlineArrowLeft } from "react-icons/ai";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://help-desk-ruddy.vercel.app/api/v1/users/profile",
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
        `https://help-desk-ruddy.vercel.app/api/v1/users/${userId}`,
        {
          newEmail,
          newUsername,
          newPhoneNumber,
        },
        { withCredentials: true }
      );
      // Optionally, you can show a success message to the user
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="max-w-[800px] mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6">Update Your Profile</h1>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
            Email:
          </label>
          <input
            id="email"
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-600">
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">
            Phone Number:
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-500 hover:underline focus:outline-none"
        >
          <AiOutlineArrowLeft className="mr-2" />
          Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default Profile;
