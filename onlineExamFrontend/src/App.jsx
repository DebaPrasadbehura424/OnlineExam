import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// share
import Home from "./pages/authentication/Home";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";

//teacher
import Dashboard from "./pages/teacher/Dashboard";
import TeacherHelper from "./Helper/TeacherHelper";
import CreatePaper from "./pages/teacher/CreatePaper";
import CreateQuestion from "./pages/teacher/CreateQuestion";
import MyPapers from "./pages/teacher/MyPapers";
import ShowPaperQuestion from "./pages/teacher/ShowPaperQuestion";
import MyInstitute from "./pages/teacher/MyInstitute";

// students
import StudDashBoard from "./pages/students/DashboardStud";
import StudHelper from "./Helper/StudentHelper";
import ExamQuestion from "./pages/students/ExamQuestion";
import ForgetPassword from "./pages/authentication/forgetPassword";
import UpdatePassword from "./pages/authentication/UpdatePassword";
import ModifyPassword from "./pages/authentication/ModifyPassword";
import Demo from "./pages/authentication/Demo";
import EditQuestion from "./pages/teacher/EditQuestion";
import FollowTeacherPapers from "./pages/students/FollowTeacherPapers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* teacher side  */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/otpverify" element={<UpdatePassword />} />
      <Route path="/modifypassword" element={<ModifyPassword />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/loginhelper"
        element={
          <TeacherHelper>
            <Dashboard />
          </TeacherHelper>
        }
      />
      <Route path="/create-paper" element={<CreatePaper />} />
      <Route path="/create-question" element={<CreateQuestion />} />
      <Route path="/my-papers" element={<MyPapers />} />
      <Route path="/my-institute" element={<MyInstitute />} />
      <Route path="/showquestionpaper" element={<ShowPaperQuestion />} />
      <Route path="/editquestionpaper" element={<EditQuestion />} />

      {/* student  side  */}
      <Route path="/find-dashboard" element={<StudDashBoard />} />
      <Route path="/findpapers" element={<FollowTeacherPapers />} />
      <Route path="/examquestion" element={<ExamQuestion />} />
      <Route
        path="/studHelper"
        element={
          <StudHelper>
            <StudDashBoard />
          </StudHelper>
        }
      />
    </Routes>
  );
}

export default App;
