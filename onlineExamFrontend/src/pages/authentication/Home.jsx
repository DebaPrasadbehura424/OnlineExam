import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../../3dmodels/hi.png";

function Home() {
  const navigate = useNavigate();

  const teacherId = localStorage.getItem("teacherId");
  const studentId = localStorage.getItem("studentId");
  const myInstituteId = localStorage.getItem("myInstituteId");
  useEffect(() => {
    if (teacherId != null) {
      sessionStorage.setItem("teacherId", teacherId);
      sessionStorage.setItem("myInstituteId", myInstituteId);
      navigate("/dashboard");
    }
    if (studentId != null) {
      sessionStorage.setItem("studentId", studentId);
      navigate("/find-dashboard");
    }
  }, []);

  const handleRegisterClick = () => {
    sessionStorage.setItem("card", "register");
    navigate("/register");
  };

  const handleLoginClick = () => {
    sessionStorage.setItem("card", "login");
    navigate("/login");
  };

  return (
    <section className="bg-gradient-to-r bg-[#000000] text-white sm:py-40 w-full h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 ">
        <div className="sm:w-1/2 text-center sm:text-left mb-8 sm:mb-0">
          <h1 className="text-4xl sm:text-8xl font-extrabold leading-tight mb-4">
            Welcome to Know-Vera
          </h1>
          <p className="text-xl sm:text-2xl font-medium mb-6">
            Revolutionizing online exams with efficient, secure, and innovative
            solutions.
          </p>
          <div>
            <button
              onClick={handleRegisterClick}
              className="bg-transparent text-white border-2 border-white py-3 px-8 rounded-full mx-4 transform hover:scale-105 transition-all"
            >
              Register
            </button>
            <button
              onClick={handleLoginClick}
              className="bg-transparent text-white py-3 px-8 border-2 border-white rounded-full mx-4 transform hover:scale-105 transition-all"
            >
              Login
            </button>
          </div>
        </div>
        <div className="sm:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-96 sm:h-[600px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
