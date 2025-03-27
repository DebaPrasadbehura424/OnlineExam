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

  useEffect(() => {
    if (teacherId != null) {
      navigate("/loginhelper");
    }
  }, [teacherId]);

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
        ? "http://localhost:4040/teachers/login"
        : "http://localhost:4040/students/login";

    try {
      if (role === "Teacher") {
        const response = await axios.post(url, { email, password });

        if (response.status === 200) {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("teacherId", response.data.teacher.teacherId);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("teacherId", response.data.teacher.teacherId);
          navigate("/loginhelper");
          alert("Welcome back, Teacher!");
        }
      } else {
        const response = await axios.post(url, {
          studEmail: email,
          studPassword: password,
        });
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("studentId", response.data.student.studId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("studentId", response.data.student.studId);
        navigate("/studHelper");
        alert("Welcome back, Student!");
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
    if (platform === "google") {
      window.location.href =
        "http://localhost:4040/oauth2/authorization/google";
    } else if (platform === "github") {
      window.location.href =
        "http://localhost:4040/oauth2/authorization/github";
    }
  };

  return (
    <div className="bg-[#000] flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 shadow-xl rounded-lg w-full max-w-4xl flex">
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login as {role}
          </h2>

          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-3 mr-4 rounded-lg ${
                role === "Teacher" ? "bg-[#0048B5] text-white" : "bg-gray-300"
              }`}
              onClick={() => handleRoleChange("Teacher")}
            >
              Teacher
            </button>
            <button
              className={`px-6 py-3 rounded-lg ${
                role === "Student" ? "bg-[#0048B5] text-white" : "bg-gray-300"
              }`}
              onClick={() => handleRoleChange("Student")}
            >
              Student
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-8">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
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

            <div className="mb-8 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
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
              className="w-full bg-[#000] text-white py-3 rounded-lg hover:bg-gray-900 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <div className="text-center text-gray-500 my-6">or login with</div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-1/2 bg-[#000] text-white py-3 rounded-lg hover:bg-gray-900 transition-all duration-300"
            >
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="w-1/2 bg-[#000] text-white py-3 rounded-lg hover:bg-gray-900 transition-all duration-300"
            >
              GitHub
            </button>
          </div>
        </div>

        <div className="w-1/2 hidden lg:block">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
