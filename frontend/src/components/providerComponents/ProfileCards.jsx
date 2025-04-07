import React from "react";

const ProfileCard = ({ name, profession, rating, onClick, onEditClick }) => {
  // Function to generate stars dynamically
  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index} className={index < rating ? "text-black text-lg" : "text-gray-400 text-lg"}>
        ★
      </span>
    ));
  };

  return (
    <div
  onClick={onClick}
  className="flex items-center justify-between p-6 bg-white rounded-lg border border-gray-300 
             w-full max-w-5xl h-auto shadow-sm cursor-pointer hover:bg-gray-50 transition-all mx-auto"
>


      {/* Left Section - Profile Image and Text */}
      <div className="flex items-center space-x-4">
        {/* Profile Image Placeholder */}
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>

        {/* User Details */}
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-500 text-sm">{profession}</p>

          {/* Star Rating */}
          <div className="flex space-x-1 mt-1">{renderStars(rating)}</div>
        </div>
      </div>

      {/* Right Section - Edit Profile Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click from triggering
          onEditClick();
        }}
        className="border border-black text-black text-xs px-6 py-3 rounded-md cursor-pointer
                   hover:bg-black hover:text-white transition-all duration-200 transform hover:scale-105"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
