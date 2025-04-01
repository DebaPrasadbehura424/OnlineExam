import React, { useContext, useState } from "react";
import {
  FaSignOutAlt,
  FaClipboardList,
  FaUsers,
  FaBars,
  FaTimes,
  FaHome,
  FaPencilAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Details from "./Details";
import ExamAttend from "./ExamAttend";
import YourInstitute from "./YourInstitute";
import FollowTeacher from "./FollowTeacher";

function StudentDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showPanel, setShowPanel] = useState("dashboardveiw");

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleNavigation = (path) => {
    setShowPanel(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-72`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold tracking-tight">Know-vera</h1>
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
            name="toglletimes"
            type="button"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="p-6 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Home
            </h2>
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                showPanel === "home"
                  ? "bg-gray-800 text-indigo-400"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => handleNavigation("dashboardveiw")}
            >
              <FaHome className="mr-3" />
              <span>Profile</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Options
            </h2>
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                showPanel === "examattendance"
                  ? "bg-gray-800 text-indigo-400"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => handleNavigation("examattendance")}
            >
              <FaPencilAlt className="mr-3" />
              <span>Attend Exam</span>
            </div>
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                showPanel === "totalpoints"
                  ? "bg-gray-800 text-indigo-400"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => handleNavigation("totalpoints")}
            >
              <FaClipboardList className="mr-3" />
              <span>Your Institutes</span>
            </div>
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                showPanel === "followedteachers"
                  ? "bg-gray-800 text-indigo-400"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => handleNavigation("followedteachers")}
            >
              <FaUsers className="mr-3" />
              <span>Teachers</span>
            </div>
          </div>

          <div
            className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-200"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <button onClick={toggleSidebar} name="toogle" type="button">
            <FaBars className="text-gray-700" size={24} />
          </button>
        </div>

        <div className="flex-1 p-4 sm:p-6 md:pl-0">
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            {showPanel === "dashboardveiw" && <Details />}
            {showPanel === "examattendance" && <ExamAttend />}
            {showPanel === "totalpoints" && <YourInstitute />}
            {showPanel === "followedteachers" && <FollowTeacher />}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default StudentDashboard;
