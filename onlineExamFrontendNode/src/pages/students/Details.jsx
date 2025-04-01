import React, { useContext, useState } from "react";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const studentData = {
    attendedExams: 5,
    followedTeachers: 8,
    upcomingExams: 3,
    averageScore: 87.5,
    recentExams: [
      { id: 1, title: "Math Finals", score: 92, date: "2025-03-20" },
      { id: 2, title: "Physics Quiz", score: 85, date: "2025-03-15" },
    ],
    achievements: [
      { id: 1, title: "Top Scorer", date: "2025-03-01" },
      { id: 2, title: "Perfect Attendance", date: "2025-02-15" },
    ],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            <StatCard
              title="Exams Attended"
              value={studentData.attendedExams}
              icon="📝"
              color="bg-blue-100"
            />
            <StatCard
              title="Followed Teachers"
              value={studentData.followedTeachers}
              icon="👩‍🏫"
              color="bg-green-100"
            />
            <StatCard
              title="Upcoming Exams"
              value={studentData.upcomingExams}
              icon="⏰"
              color="bg-yellow-100"
            />
            <StatCard
              title="Average Score"
              value={`${studentData.averageScore}%`}
              icon="⭐"
              color="bg-purple-100"
            />
          </div>
        );
      case "exams":
        return (
          <div className="space-y-4 animate-fadeIn">
            {studentData.recentExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{exam.title}</h3>
                <p className="text-gray-600">Score: {exam.score}%</p>
                <p className="text-gray-500 text-sm">Date: {exam.date}</p>
              </div>
            ))}
          </div>
        );
      case "achievements":
        return (
          <div className="space-y-4 animate-fadeIn">
            {studentData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                <p className="text-gray-500 text-sm">
                  Earned on: {achievement.date}
                </p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div
      className={`${color} p-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-gray-600">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Student Dashboard
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
            {["overview", "exams", "achievements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div>{renderContent()}</div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            // onClick={() => setShowPanel("examattendance")}
          >
            Join Exam
          </button>
          <button
            className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
            // onClick={() => setShowPanel("totalpoints")}
          >
            Contact Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
