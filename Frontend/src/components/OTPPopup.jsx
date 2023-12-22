import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LightOceanTheme } from './themes'; // Assuming you want a default theme
const theme = LightOceanTheme; // Using the default light theme

const OTPPopup = ({ onVerifyOTP, onClose }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    onVerifyOTP(otp);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-500/80 z-30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
        <AiOutlineClose
          onClick={onClose}
          size={30}
          className="absolute top-4 right-4 cursor-pointer"
        />
        <h2 className="text-2xl mb-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className={`p-2 mb-4 w-full bg-white border-b border-gray-300 focus:outline-none focus:border-${theme.colors.primary}`}
        />
        <button
          onClick={handleVerify}
          className={`bg-${theme.colors.primary} text-black p-2 rounded-full w-full`} // Change text color to black
        >
          Verify
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OTPPopup;
