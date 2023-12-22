import React, { useState } from "react";

const OTPPopup = ({ onVerifyOTP }) => {
  const [otp, setOTP] = useState("");

  const handleVerifyOTP = () => {
    // Call the parent component's onVerifyOTP function with the entered OTP
    onVerifyOTP(otp);
  };

  return (
    <div className="otp-popup">
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
    </div>
  );
};

export default OTPPopup;
