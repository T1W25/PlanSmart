import React from "react";

const ReviewCard = ({ clientName, rating, reviewText, date }) => {
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
          <h3 className="text-lg font-bold">{clientName || "Anonymous"}</h3>
          <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-1 mt-1">{renderStars(rating || 0)}</div>
      </div>
      <p className="text-gray-700 text-sm mt-2">{reviewText || "No review provided."}</p>
    </div>
  );
};

export default ReviewCard;
