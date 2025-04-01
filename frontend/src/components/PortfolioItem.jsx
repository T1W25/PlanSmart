import React, { useState } from "react";
import axios from "axios";

const PortfolioItem = ({ Type, Description, PastWorkMedia = [] }) => {
  const [mediaList, setMediaList] = useState(PastWorkMedia);

  const hardcodedEntityId = "67d9acf452f588f77d3d63f9"; // Hardcoded for testing

  // Handle Media Deletion
  const handleDelete = async (mediaUrl) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
  
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/portfolio/media/${hardcodedEntityId}`, {
        data: { mediaUrl },
      });
  
      alert("Media deleted successfully!");
      console.log(response.data);
  
      // Remove from UI
      setMediaList((prev) => prev.filter((url) => url !== mediaUrl));
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert("Error deleting media");
    }
  };
  
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="font-semibold">{Type}</h3>
      <p className="text-sm text-gray-600">{Description}</p>

      {/* Display Uploaded Media (Images & Videos) */}
      {mediaList.length > 0 ? (
        mediaList.map((media, index) => (
          <div key={index} className="relative mt-2">
            {media.endsWith(".mp4") || media.endsWith(".mov") || media.endsWith(".avi") ? (
              <video src={media} className="w-full h-40 object-cover rounded-md" controls />
            ) : (
              <img src={media} alt="Portfolio" className="w-full h-40 object-cover rounded-md" />
            )}
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(media)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
            >
              ❌
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No media available.</p>
      )}
    </div>
  );
};

export default PortfolioItem;