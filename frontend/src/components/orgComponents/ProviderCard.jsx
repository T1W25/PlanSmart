import React from "react";
import { useNavigate } from "react-router-dom";

const ProviderCard = ({ id, name, email, phone, rating, isVerified, providerType }) => {
  const normalizedType =
  providerType === "Vendor" ? "vendors"
  : providerType === "Guest Speaker" ? "guest-speakers"
  : providerType === "Transportation Provider" ? "transportation-providers"
  : "";
  const navigate = useNavigate();
  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index} className={index < rating ? "text-black text-lg" : "text-gray-400 text-lg"}>
        ★
      </span>
    ));
  };
  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-600">📧 {email}</p>
          <p className="text-sm text-gray-600">📞 {phone || "No phone provided"}</p>
          <p className="text-sm text-gray-600 italic">{providerType}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="flex space-x-1">{renderStars(rating ?? 0)}</div>
          <p className={`text-sm font-semibold ${isVerified ? "text-green-600" : "text-red-500"}`}>
            {isVerified ? "✅ Verified" : "❌ Not Verified"}
          </p>
        </div>
      </div>
      {/* Buttons Section */}
      <div className="mt-4 flex space-x-4 justify-between">
        <button className="px-4 py-2 bg-blue-100 text-black rounded-lg hover:bg-gray-300 focus:outline-none cursor-pointer" onClick={() => navigate(`/addreview/${id}`)}>
          Add Review
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none cursor-pointer" onClick={() => navigate(`/provider-dashboard/${normalizedType}/${id}`)
        } 
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;
