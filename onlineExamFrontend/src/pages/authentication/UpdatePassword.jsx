import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdatePassword(props) {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!otp) {
      setErrorMessage("All fields are required!");
      return;
    }

    await axios
      .delete(`http://localhost:4040/email/deleteOtp/${otp}`)
      .then((res) => {
        if (res.status === 200) {
          alert("otp verify successfully!");
          navigate("/modifypassword");
        }
      })
      .catch((err) => {
        alert("invlid otp");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify Otp</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify Otp
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
