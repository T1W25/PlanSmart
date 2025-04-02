import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProfileCards from "../components/ProfileCards";
import PortfolioShowcase from "../components/PortfolioShowcase";

import { getUser } from "../utils/auth";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const authUser = getUser(); // ⬅️ Get user info from token

  // ✅ Replace this hardcoded userId with the actual one from token, if possible
  const userId = authUser?.userID || "67d9acf452f588f77d3d63f9";

  useEffect(() => {
    if (!authUser?.email) return;
  
    axios
      .get(`http://localhost:5050/api/transportation-providers/by-email/${authUser.email}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching provider:", error));
  }, [authUser?.email]);
  

  return (
    <div className="flex flex-col items-center space-y-6 pt-24 px-6 w-full">
      <Navbar />

      {/* ✅ User info from token */}
      <div className="text-center text-gray-700">
        {authUser ? (
          <p className="text-md">
            Logged in as <strong>{authUser.username}</strong> ({authUser.email})
          </p>
        ) : (
          <p className="text-red-500">User info not found</p>
        )}
      </div>

      {/* Profile Section */}
      <div className="pt-4 flex justify-center w-full">
        {userData ? (
          <ProfileCards
            name={userData.Name}
            profession={userData.ProviderType}
            rating={userData.rating}
            onClick={() => navigate("/pages/profileview")}
            onEditClick={() => navigate("/pages/profileedit")}
          />
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Portfolio Showcase Section */}
      {userData && (
        <PortfolioShowcase
          portfolioData={userData.Portfolio}
          showCase1={
            userData.Portfolio.PastWorkMedia[
              userData.Portfolio.PastWorkMedia.length - 1
            ] || "No Media Available"
          }
          showCase2={
            userData.Portfolio.PastWorkMedia[
              userData.Portfolio.PastWorkMedia.length - 2
            ] || "No Media Available"
          }
          onEditClick={() => navigate("/pages/portfolioeditor")}
          onViewAllClick={() => navigate("/pages/portfoliodisplay")}
        />
      )}
    </div>
  );
}

export default Dashboard;
