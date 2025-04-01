import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSignOutAlt,
  FaClipboardList,
  FaPlus,
  FaUniversity,
  FaUsers,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import DashboardOverView from "./DashboardOverView";
import MyPapers from "./MyPapers";
import MyInstitute from "./MyInstitute";
import Students from "./Students";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [showPanel, setShowPanel] = useState("dashboardveiw");

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleNavigation = (path) => {
    setShowPanel(path);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex overflow-hidden">
      <div
        className={`bg-[#101010] text-white w-64 p-6 h-screen fixed transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 z-50`}
      >
        <div className="text-2xl font-semibold mb-6">Know-vera</div>
        <div className="space-y-4">
          <div>
            <div className="font-semibold text-xl text-gray-300 mb-2">Home</div>
            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("dashboardveiw")}
            >
              <FaHome className="mr-3" />
              Profile
            </div>
          </div>

          <div>
            <div className="font-semibold text-xl text-gray-300 mb-2">
              Papers
            </div>
            <NavLink to="/create-paper">
              <div className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded">
                <FaPlus className="mr-3" />
                Create Paper
              </div>
            </NavLink>

            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("mypapers")}
            >
              <FaClipboardList className="mr-3" />
              My Papers
            </div>
          </div>

          <div>
            <div className="font-semibold text-xl text-gray-300 mb-2">
              Institute
            </div>
            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("myinstitute")}
            >
              <FaUniversity className="mr-3" />
              My Institute
            </div>
          </div>

          <div>
            <div className="font-semibold text-xl text-gray-300 mb-2">
              People
            </div>
            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("students")}
            >
              <FaUsers className="mr-3" />
              Students
            </div>
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout <FaSignOutAlt className="inline ml-2" />
          </div>
        </div>
      </div>

      <div
        className={`flex-1 p-6 bg-gray-100 min-h-screen transition-all ${
          isSidebarOpen ? "ml-0" : "ml-0"
        } md:ml-64`}
      >
        <div className="flex justify-between items-center mb-6">
          <button className="md:hidden text-gray-800" onClick={toggleSidebar}>
            <FaBars size={30} />
          </button>
        </div>

        <div className="bg-gray-300 p-6 rounded-lg shadow-lg h-full">
          {showPanel === "" && <DashboardOverView />}
          {showPanel === "dashboardveiw" && <DashboardOverView />}
          {showPanel === "mypapers" && <MyPapers />}
          {showPanel === "myinstitute" && <MyInstitute />}
          {showPanel === "students" && <Students />}
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 bg-[#181818] text-white w-64 p-6 h-screen transform transition-transform z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold mb-6">Dashboard</div>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-white text-2xl" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("dashboardveiw")}
            >
              <FaHome className="mr-3" />
              Profile
            </div>

            <NavLink to="/create-paper">
              <div className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded">
                <FaPlus className="mr-3" />
                Create Paper
              </div>
            </NavLink>

            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("mypapers")}
            >
              <FaClipboardList className="mr-3" />
              My Papers
            </div>
          </div>

          <div>
            <div className="font-semibold text-xl text-gray-300 mb-2">
              Institute
            </div>
            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("myinstitute")}
            >
              <FaUniversity className="mr-3" />
              My Institute
            </div>
            <div
              className="text-lg cursor-pointer flex items-center mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={() => handleNavigation("students")}
            >
              <FaUsers className="mr-3" />
              Students
            </div>
          </div>

          <div className="mt-6">
            <div
              className="text-lg cursor-pointer mt-2 hover:bg-gray-700 p-2 rounded"
              onClick={handleLogout}
            >
              Logout <FaSignOutAlt className="inline ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
