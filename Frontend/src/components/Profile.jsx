import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  //   const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/profile"
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        console.log("Profile Response:", response);

        setUser(response.data.user);
        setNewEmail(response.data.user.Email);
        setNewUsername(response.data.user.Username);
        setNewPhoneNumber(response.data.user.PhoneNumber);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/users/${user._id}`,
        {
          newEmail,
          newUsername,
          newPhoneNumber,
        }
      );

      console.log(response.data.message);
      // Optionally, you can update the user state with the updated data if needed
      setUser(response.data.user);
    } catch (error) {
      console.error("Profile update failed:", error.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;