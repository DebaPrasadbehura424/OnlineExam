import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "./../../3dmodels/login.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("Teacher");
  const navigate = useNavigate();
  const teacherId = sessionStorage.getItem("teacherId");
  const studentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    if (teacherId != null) {
      navigate("/loginhelper");
    }
    if (studentId != null) {
      navigate("/studHelper");
    }
  }, [teacherId, studentId]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    setLoading(true);
    setError("");

    const url =
      role === "Teacher"
        ? "http://localhost:7777/teacher/login"
        : "http://localhost:7777/student/login";

    try {
      if (role === "Teacher") {
        const response = await axios.post(url, {
          email: email,
          password: password,
        });

        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          sessionStorage.setItem("teacherId", response.data.teacherId);
          alert("Welcome back, Teacher!");
          navigate("/loginhelper");
        }
      } else {
        const response = await axios.post(url, {
          studEmail: email,
          studPassword: password,
        });
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("studentId", response.data.studentId);
        alert("Welcome back, Student!");
        navigate("/studHelper");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Error during login:", err);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSocialLogin = (platform) => {
    // if (platform === "google") {
    //   window.location.href =
    //     "http://localhost:4040/oauth2/authorization/google";
    // } else if (platform === "github") {
    //   window.location.href =
    //     "http://localhost:4040/oauth2/authorization/github";
    // }
  };

  return (
    <div className="bg-gradient-to-r from-[#0048B5] to-[#0059D4] flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-2xl rounded-xl w-full max-w-4xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Login as {role}
          </h2>

          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-3 mr-4 rounded-lg transition duration-300 ${
                role === "Teacher" ? "bg-[#0048B5] text-white" : "bg-gray-300"
              }`}
              onClick={() => handleRoleChange("Teacher")}
            >
              Teacher
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition duration-300 ${
                role === "Student" ? "bg-[#0048B5] text-white" : "bg-gray-300"
              }`}
              onClick={() => handleRoleChange("Student")}
            >
              Student
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="off"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <FaEyeSlash size={20} className="mt-7 text-gray-600" />
                ) : (
                  <FaEye size={20} className="mt-7 text-gray-600" />
                )}
              </span>
              <a
                href="forgetpassword"
                className="text-sm text-red-500 hover:text-blue-500 float-right mt-2 mb-2"
              >
                Forgot Password?
              </a>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#0048B5] text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <div className="text-center text-gray-500 my-6">or login with</div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-1/2 bg-[#4285F4] text-white py-3 rounded-lg hover:bg-[#357ae8] transition-all duration-300"
            >
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="w-1/2 bg-[#333] text-white py-3 rounded-lg hover:bg-[#444] transition-all duration-300"
            >
              GitHub
            </button>
          </div>
        </div>

        <div className="w-1/2 hidden lg:block">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
