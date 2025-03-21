import React from "react";

const PortfolioShowcase = ({ onEditClick, onViewAllClick }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-5xl mx-auto shadow-sm mt-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">My Portfolio Showcase</h2>
        <button
          onClick={onEditClick}
          className="bg-black text-white text-xs px-4 py-2 rounded-md cursor-pointer
                     hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
        >
          Edit Portfolio
        </button>
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-80 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-sm">
          Showcase 1
        </div>
        <div className="w-full h-80 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-sm">
          Showcase 2
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onViewAllClick}
          className="text-black text-xs font-bold hover:underline cursor-pointer"
        >
          See all &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default PortfolioShowcase;
