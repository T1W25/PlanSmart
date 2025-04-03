// src/components/RedirectHome.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const RedirectHome = () => {
  return isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/register" />;
};

export default RedirectHome;
