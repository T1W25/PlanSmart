// src/components/ProviderCard.jsx
import React from "react";

const ProviderCard = ({ name, email, phone, rating, isVerified, providerType }) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white space-y-1">
      <p className="font-bold text-lg">{name}</p>
      <p className="text-sm text-gray-600">📧 {email}</p>
      <p className="text-sm text-gray-600">📞 {phone || "No phone provided"}</p>
      <p className="text-sm text-gray-600">⭐ Rating: {rating ?? "N/A"}</p>
      <p className={`text-sm font-semibold ${isVerified ? "text-green-600" : "text-red-500"}`}>
        {isVerified ? "✔ Verified" : "✘ Not Verified"}
      </p>
      <p className="text-xs text-gray-500 italic">{providerType}</p>
    </div>
  );
};

export default ProviderCard;
