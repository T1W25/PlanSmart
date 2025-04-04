// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn, getUser } from "../utils/auth";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = getUser();
  const loggedIn = isLoggedIn();
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
