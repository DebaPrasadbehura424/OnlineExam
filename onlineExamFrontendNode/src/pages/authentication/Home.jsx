import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../3dmodels/hi.png";

function Home() {
  const navigate = useNavigate();
  const statsRef = useRef(null);

  const handleRegisterClick = () => {
    sessionStorage.setItem("card", "register");
    navigate("/register");
  };

  const handleLoginClick = () => {
    sessionStorage.setItem("card", "login");
    navigate("/login");
  };

  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const stats = {
    teachersJoined: 1500,
    studentsJoined: 25000,
    questionsAvailable: 10000,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let teacherInterval = setInterval(() => {
            setTeacherCount((prev) => {
              if (prev >= stats.teachersJoined) {
                clearInterval(teacherInterval);
                return stats.teachersJoined;
              }
              return prev + Math.ceil(stats.teachersJoined / 50);
            });
          }, 100);

          let studentInterval = setInterval(() => {
            setStudentCount((prev) => {
              if (prev >= stats.studentsJoined) {
                clearInterval(studentInterval);
                return stats.studentsJoined;
              }
              return prev + Math.ceil(stats.studentsJoined / 50);
            });
          }, 100);

          let questionInterval = setInterval(() => {
            setQuestionCount((prev) => {
              if (prev >= stats.questionsAvailable) {
                clearInterval(questionInterval);
                return stats.questionsAvailable;
              }
              return prev + Math.ceil(stats.questionsAvailable / 50);
            });
          }, 100);

          return () => {
            clearInterval(teacherInterval);
            clearInterval(studentInterval);
            clearInterval(questionInterval);
          };
        }
      },
      { threshold: 0.32 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [stats]);

  return (
    <div className="bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white min-h-screen w-full overflow-hidden">
      <section className="relative flex items-center min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#a1a1a1]">
                  Welcome to Know-Vera
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-300 leading-relaxed">
                Experience the future of online examinations with cutting-edge
                technology, unparalleled security, and seamless user experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleRegisterClick}
                  className="relative bg-gradient-to-r from-[#ffffff] to-[#e0e0e0] text-black font-semibold py-3 px-8 rounded-full overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative">Get Started</span>
                </button>
                <button
                  onClick={handleLoginClick}
                  className="relative bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:border-[#ffffff80]"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative">Sign In</span>
                </button>
              </div>
              <p className="text-sm text-gray-400 italic">
                Trusted by 1000+ institutions worldwide | Secure & Scalable
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff10] to-transparent rounded-full blur-3xl"></div>
                <img
                  src={heroImage}
                  alt="Know-Vera Platform Preview"
                  className="relative w-full h-64 sm:h-96 lg:h-[600px] object-contain transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <p>Scroll down</p>
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className="py-16 px-4 sm:px-6 lg:px-12 bg-[#1a1a1a] border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-12">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-white  transition-all duration-200">
                {teacherCount.toLocaleString()}
              </h3>
              <p className="text-gray-400">Teachers Joined</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-white  transition-all duration-200">
                {studentCount.toLocaleString()}
              </h3>
              <p className="text-gray-400">Students Joined</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-white  transition-all duration-200 ">
                {questionCount.toLocaleString()}
              </h3>
              <p className="text-gray-400">Questions Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#2d2d2d] py-8 px-4 sm:px-6 lg:px-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-semibold mb-4">Know-Vera</h4>
            <p className="text-gray-400">
              Revolutionizing online education since 2023.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex justify-center sm:justify-start gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Know-Vera. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
