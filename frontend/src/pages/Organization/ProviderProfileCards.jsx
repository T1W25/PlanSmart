import React from "react";
import { useNavigate } from "react-router-dom";

const ProviderProfileCard = ({ id, name, profession, rating, providerType }) => {
  const navigate = useNavigate();

  const normalizedType =
    providerType === "Vendor"
      ? "vendors"
      : providerType === "Guest Speaker"
      ? "guest-speakers"
      : providerType === "Transportation Provider"
      ? "transportation-providers"
      : "";

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index} className={index < rating ? "text-black text-lg" : "text-gray-400 text-lg"}>
        ★
      </span>
    ));
  };
  const handleClick = () => {
    if (!normalizedType || !id) return console.warn("Missing route info");
    navigate(`/providerprofile/${normalizedType}/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-6 bg-white rounded-lg border border-gray-300 
               w-full max-w-5xl h-auto shadow-sm cursor-pointer hover:bg-gray-50 transition-all mx-auto"
    >
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-500 text-sm">{profession}</p>
          <div className="flex space-x-1 mt-1">{renderStars(rating)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfileCard;
