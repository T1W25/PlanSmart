// src/components/RedirectHome.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn, getUser } from "../utils/auth";

const RedirectHome = () => {
  if (!isLoggedIn()) {
    return <Navigate to="/register" />;
  }

  const user = getUser();

  if (user?.role === "organization") {
    return <Navigate to="/orgdashboard" />;
  }

  return <Navigate to="/dashboard" />;
};

export default RedirectHome;
