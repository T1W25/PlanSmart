import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProfileCards from "../components/ProfileCards";
import ReviewCards from "../components/ReviewCards";
import PortfolioShowcase from "../components/PortfolioShowcase";
import { getUser } from "../utils/auth";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const authUser = getUser(); // ⬅️ Get user info from token

  const providerType = authUser?.providerType;
  const email = authUser?.email;

  useEffect(() => {
    if (!providerType || !email) return;

    const endpointMap = {
      "Transportation Provider": "transportation-providers",
      "Vendor": "vendors",
      "Guest Speaker": "guest-speakers",
    };
  
    const route = endpointMap[providerType];
    if (!route) return;

    axios
      .get(`http://localhost:5050/api/${route}/${authUser.providerID}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching provider:", error));
  }, [providerType, email]);
  

  return (
    <div className="flex flex-col items-center space-y-6 pt-24 px-6 w-full">
      <Navbar />

      {/* ✅ User info from token */}
      <div className="text-center text-gray-700">
        {authUser ? (
          <p className="text-md">
            Logged in as <strong>{authUser.name}</strong> ({authUser.email})
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
          portfolioData={userData?.Portfolio || {}}
          showCase1={
            userData?.Portfolio?.PastWorkMedia?.[
              userData.Portfolio.PastWorkMedia.length - 1
            ] || ""
          }
          showCase2={
            userData?.Portfolio?.PastWorkMedia?.[
              userData.Portfolio.PastWorkMedia.length - 2
            ] || ""
          }
          onEditClick={() => navigate("/pages/portfolioeditor")}
          onViewAllClick={() => navigate("/pages/portfoliodisplay")}
        />
      )}
        <ReviewCards/>
    </div>
  );
}

export default Dashboard;
