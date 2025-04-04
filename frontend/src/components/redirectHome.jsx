// src/components/RedirectHome.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const RedirectHome = () => {
  if (!isLoggedIn()) {
    return <Navigate to="/register" />;
  }

  const user = getUser();

  if (user?.role === "organization") {
    return <Navigate to="/organization" />;
  }

  return <Navigate to="/dashboard" />;
};

export default RedirectHome;
