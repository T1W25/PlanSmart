import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Remove the JWT token from localStorage
    localStorage.removeItem("token");

    // 2. Redirect user to login page after a brief pause
    setTimeout(() => {
      navigate("/login");
    }, 500); // you can change this duration or remove delay entirely
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg font-medium text-gray-700">Signing out...</p>
    </div>
  );
}

export default Signout;
