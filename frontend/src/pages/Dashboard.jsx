import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProfileCards from "../components/ProfileCards";
import PortfolioShowcase from "../components/PortfolioShowcase";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const userId = "67d9acf452f588f77d3d63f9";

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/transportation-providers/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 pt-24 px-6 w-full">
      <Navbar />
      
      {/* Profile Section */}
      <div className="pt-4 flex justify-center w-full">
        {userData ? (
          <ProfileCards
            name={userData.Name}
            profession={userData.ProviderType}
            rating={userData.rating}
            onClick={() => console.log("Card clicked!")}
            onEditClick={() => console.log("Edit Profile clicked!")}
          />
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Portfolio Showcase Section */}
      {userData && (
        <PortfolioShowcase
          portfolioData={userData.Portfolio}
          showCase1={userData.Portfolio.PastWorkMedia[userData.Portfolio.PastWorkMedia.length - 1] || "No Media Available"}
          showCase2={userData.Portfolio.PastWorkMedia[userData.Portfolio.PastWorkMedia.length - 2] || "No Media Available"}
          onEditClick={() => console.log("Edit Portfolio Clicked")}
          onViewAllClick={() => console.log("View All Clicked")}
        />
      )}
    </div>
  );
}

export default Dashboard;
