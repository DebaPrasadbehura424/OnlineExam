import { useNavigate } from "react-router-dom";

function TeacherHelper({ children }) {
  const navigate = useNavigate();
  const teacherId = sessionStorage.getItem("teacherId");

  if (!teacherId) {
    navigate("/register");
  }
  return children;
}

export default TeacherHelper;
