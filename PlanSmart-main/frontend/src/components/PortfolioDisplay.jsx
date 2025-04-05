import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioItem from "./PortfolioItem";
import { getUser } from "../utils/auth";

const PortfolioDisplay = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);

  const user = getUser();
  const userId = user?.providerID;

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!userId) {
        setError("User not found.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5050/api/portfolio/${userId}`);
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setError("Portfolio not found or server error.");
      }
    };

    fetchPortfolio();
  }, [userId]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : portfolio ? (
        <PortfolioItem
          key={userId}
          Type={portfolio.Type || "No Type"}
          Description={portfolio.Description || "No Description"}
          PastWorkMedia={portfolio.PastWorkMedia || []}
        />
      ) : (
        <p>Loading portfolio...</p>
      )}
    </div>
  );
};

export default PortfolioDisplay;
