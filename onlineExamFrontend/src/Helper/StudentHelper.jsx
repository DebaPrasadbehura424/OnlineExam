import { useNavigate } from "react-router-dom";
function LoginHelper({ children }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/register");
  }

  return children;
}

export default LoginHelper;
