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
      setStudentData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setTeacherData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let formData = isStudent ? studentData : teacherData;

    try {
      const response = await axios.post(
        `http://localhost:4040/${isStudent ? "students" : "teachers"}/register`,
        formData
      );
      if (response.status === 201) {
        alert(`${isStudent ? "Student" : "Teacher"} registration successful!`);
        sessionStorage.setItem("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        if (isStudent) {
          sessionStorage.setItem("studentId", response.data.student.studId);
          localStorage.setItem("studentId", response.data.student.studId);
          navigate("/studHelper");
        } else {
          sessionStorage.setItem("teacherId", response.data.teacher.teacherId);
          localStorage.setItem("teacherId", response.data.teacher.teacherId);
          navigate("/loginhelper");
        }
      }
    } catch (err) {
      alert(
        `${
          isStudent ? "Student" : "Teacher"
        } registration failed. Please try again.`
      );
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = (role) => setIsStudent(role === "Student");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:4040/oauth2/authorization/${provider.toLowerCase()}`;
  };

  const classOptions = Array.from({ length: 12 }, (_, i) => i + 1).concat(
    "Other"
  );
  const subjectOptions = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Computer Science",
    "Economics",
    "Physical Education",
  ];

  return (
    <div className="min-h-screen bg-gray-600 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isStudent ? "Student Registration" : "Teacher Registration"}
          </h2>

          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => toggleRole("Student")}
              type="button"
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold transition-all duration-300 ${
                isStudent
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => toggleRole("Teacher")}
              type="button"
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold transition-all duration-300 ${
                !isStudent
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isStudent ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="studEmail"
                    value={studentData.studEmail}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <select
                    name="studClass"
                    value={studentData.studClass}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Class</option>
                    {classOptions.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="studPassword"
                      value={studentData.studPassword}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={teacherData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={teacherData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Subject</option>
                    {subjectOptions.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={teacherData.password}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-600 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
            >
              <FaGoogle className="mr-2 text-red-500" /> Google
            </button>
            <button
              onClick={() => handleSocialLogin("GitHub")}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-600 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
            >
              <FaGithub className="mr-2 text-black" /> GitHub
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2 p-6 bg-gray-100">
          <img
            src={teacherImage}
            alt="Registration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
