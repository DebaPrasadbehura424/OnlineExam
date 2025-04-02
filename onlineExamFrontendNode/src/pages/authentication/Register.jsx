import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import teacherImage from "../../3dmodels/studentregister.png"; // Your image

function Register() {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(true);
  const [formData, setFormData] = useState({ role: "Student" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const backednUrl = "http://localhost:7777";
  const backednUrl = "https://online-exam-backendnode.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backednUrl}/${isStudent ? "student" : "teacher"}/register`,
        formData
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        if (isStudent) {
          sessionStorage.setItem("studentId", response.data.student._id);
        } else {
          sessionStorage.setItem("teacherId", response.data.teacher._id);
        }
        alert(`successfully ${isStudent ? "student" : "teacher" + "register"}`);
        navigate(isStudent ? "/studHelper" : "/loginhelper");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = () => {
    setIsStudent(!isStudent);
    setFormData({ ...formData, role: isStudent ? "Teacher" : "Student" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            {isStudent ? "Student Signup" : "Teacher Signup"}
          </h2>

          <button
            onClick={toggleRole}
            className="w-full py-2 mb-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
          >
            Switch to {isStudent ? "Teacher" : "Student"}
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name={isStudent ? "studEmail" : "email"}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
            {isStudent ? (
              <select
                name="studClass"
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
              >
                <option value="">Select Class</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="subject"
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
              >
                <option value="">Select Subject</option>
                {[
                  "Math",
                  "Science",
                  "English",
                  "History",
                  "Computer Science",
                ].map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name={isStudent ? "studPassword" : "password"}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-500 transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Registering...
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </form>

          <div className="mt-6 flex justify-center gap-4">
            <button
              // onClick={() =>
              //   (window.location.href =
              //     "http://localhost:4040/oauth2/authorization/google")
              // }
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <FaGoogle className="text-red-500" size={20} />
            </button>
            <button
              // onClick={() =>
              //   (window.location.href =
              //     "http://localhost:4040/oauth2/authorization/github")
              // }
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <FaGithub className="text-gray-800" size={20} />
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2 bg-gradient-to-br from-indigo-500 to-blue-600 p-6">
          <img
            src={teacherImage}
            alt="Registration Illustration"
            className="w-full h-full object-contain transform hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
