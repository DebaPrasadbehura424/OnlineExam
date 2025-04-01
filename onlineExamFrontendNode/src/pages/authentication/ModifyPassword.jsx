import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModifyPassword() {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!email || !confirmPassword || !newPassword) {
      setErrorMessage("All fields are required!");
      setLoading(false);
      return;
    }
    if (confirmPassword !== newPassword) {
      alert(
        "Passwords do not match. Please make sure both fields are the same."
      );
      setLoading(false);
      return;
    }

    try {
      if (userType === "student") {
        const response = await axios.patch(
          "http://localhost:4040/students/modifyPassword",
          {
            studEmail: email,
            studPassword: newPassword,
          }
        );
        if (response.status === 200) {
          alert("Password updated successfully!");
          navigate("/login");
        } else {
          setErrorMessage("Error updating password. Please try again.");
        }
      } else {
        const response = await axios.patch(
          "http://localhost:4040/teachers/modifyPassword",
          {
            email: email,
            password: newPassword,
          }
        );
        if (response.status === 200) {
          alert("Password updated successfully!");
          navigate("/login");
        } else {
          setErrorMessage("Error updating password. Please try again.");
        }
      }
    } catch (error) {
      alert("email is invalid check your role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Modify Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Select User Type
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="student"
                name="userType"
                value="student"
                checked={userType === "student"}
                onChange={() => setUserType("student")}
                className="mr-2"
              />
              <label htmlFor="student" className="mr-6">
                Student
              </label>

              <input
                type="radio"
                id="teacher"
                name="userType"
                value="teacher"
                checked={userType === "teacher"}
                onChange={() => setUserType("teacher")}
                className="mr-2"
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
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
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifyPassword;
