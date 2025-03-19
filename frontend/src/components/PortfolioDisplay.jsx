import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioItem from "./PortfolioItem";

const PortfolioDisplay = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);

  const hardcodedId = "67d9acf452f588f77d3d63f9"; // Hardcoded ID for testing

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/portfolio/${hardcodedId}`);
        console.log("Fetched Portfolio:", response.data);
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setError("Portfolio not found or server error.");
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : portfolio ? (
        <PortfolioItem
          key={hardcodedId}
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
