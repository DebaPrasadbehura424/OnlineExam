import React, { useState } from "react";
import axios from "axios";
import teacherImage from "../../3dmodels/studentregister.png";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const initialTeacherData = {
    password: "",
    email: "",
    subject: "",
    role: "Teacher",
  };

  const initialStudentData = {
    studentName: "",
    studPassword: "",
    studEmail: "",
    studClass: "",
    role: "Student",
  };

  const [teacherData, setTeacherData] = useState(initialTeacherData);
  const [studentData, setStudentData] = useState(initialStudentData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isStudent) {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setTeacherData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let formData;

    if (isStudent) {
      formData = studentData;

      try {
        const response = await axios.post(
          "http://localhost:4040/students/register",
          formData
        );

        if (response.status === 201) {
          alert("Student registration successful!");
          sessionStorage.setItem("token", response.data.token);
          localStorage.setItem("token", response.data.token);
          sessionStorage.setItem("studentId", response.data.student.studId);
          localStorage.setItem("studentId", response.data.student.studId);
          navigate("/studHelper");
        }
      } catch (err) {
        alert("Student registration failed. Please try again.");
        console.error("Student registration failed:", err);
      }
    } else {
      formData = teacherData;

      try {
        const response = await axios.post(
          "http://localhost:4040/teachers/register",
          formData
        );
        if (response.status === 201) {
          alert("Teacher registration successful!");
          sessionStorage.setItem("token", response.data.token);
          localStorage.setItem("token", response.data.token);
          sessionStorage.setItem(`teacherId`, response.data.teacher.teacherId);
          localStorage.setItem(`teacherId`, response.data.teacher.teacherId);
          navigate("/loginhelper");
        }
      } catch (err) {
        alert("Teacher registration failed. Please try again.");
        console.error("Teacher registration failed:", err);
      }
    }
    setLoading(false);
  };

  const toggleRole = (role) => {
    setIsStudent(role === "Student");
  };

  const handleSocialLogin = (provider) => {
    if (provider === "GitHub") {
      window.location.href =
        "http://localhost:4040/oauth2/authorization/github";
    } else {
      window.location.href =
        "http://localhost:4040/oauth2/authorization/google";
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#000] flex justify-center items-center p-4">
      <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
            {isStudent ? "Register as Student" : "Register as Teacher"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-10 space-x-4">
              <button
                onClick={() => toggleRole("Student")}
                type="button"
                className={`px-6 py-2 rounded-lg focus:outline-none ${
                  isStudent
                    ? "bg-[#0048B5] text-white"
                    : "bg-gray-300 text-black "
                }`}
              >
                Student
              </button>
              <button
                onClick={() => toggleRole("Teacher")}
                type="button"
                className={`px-6 py-2 rounded-lg focus:outline-none  ${
                  !isStudent
                    ? "bg-[#0048B5] text-white"
                    : "bg-gray-300 text-black "
                }`}
              >
                Teacher
              </button>
            </div>

            {/* STUDENT FORM */}
            {isStudent ? (
              <>
                <div className="relative mb-6">
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 origin-top-left left-4 font-extrabold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="studEmail"
                    name="studEmail"
                    value={studentData.studEmail}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                  />
                </div>

                <div className="relative mb-6">
                  <label
                    htmlFor="studClass"
                    className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 origin-top-left left-4 font-extrabold"
                  >
                    Class
                  </label>
                  <input
                    type="text"
                    id="studClass"
                    name="studClass"
                    value={studentData.studClass}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                  />
                </div>

                <div className="relative mb-6">
                  <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 origin-top-left left-4 font-extrabold"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="studPassword"
                      name="studPassword"
                      value={studentData.studPassword}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                    />
                    <span
                      className="absolute right-4 top-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              // TEACHER FORM
              <>
                <div className="relative mb-6">
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 origin-top-left left-4 font-extrabold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={teacherData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                  />
                </div>

                <div className="relative mb-6">
                  <label
                    htmlFor="subject"
                    className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 origin-top-left left-4 font-extrabold"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={teacherData.subject}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                  />
                </div>

                <div className="relative mb-6">
                  <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-600 transform -translate-y-6 scale-75 origin-top-left left-4 font-extrabold"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={teacherData.password}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                    />
                    <span
                      className="absolute right-4 top-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-[#000] text-white rounded-lg  focus:outline-none "
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* Social Login Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="px-6 py-2 bg-[#000] text-white flex items-center rounded-lg focus:outline-none transition-all duration-300"
            >
              <FaGoogle className="mr-2" /> Google
            </button>
            <button
              onClick={() => handleSocialLogin("GitHub")}
              className="px-6 py-2 bg-[#000] text-white flex items-center rounded-lg focus:outline-none transition-all duration-300"
            >
              <FaGithub className="mr-2" /> GitHub
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
          <div className="w-full h-full rounded-lg">
            <img
              src={teacherImage}
              alt=" Registration"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
