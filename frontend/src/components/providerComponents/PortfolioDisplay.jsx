import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../utils/auth";
import Navbar from "../Navbar";

const PortfolioDisplay = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);
  const [modalMedia, setModalMedia] = useState(null);

  const user = getUser();
  const userId = user?.providerID;

  useEffect(() => {
    fetchPortfolio();
  }, [userId]);

  const fetchPortfolio = async () => {
    if (!userId) {
      setError("User not found.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/portfolio/${userId}`
      );
      setPortfolio(response.data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setError("Portfolio not found or server error.");
    }
  };

  const openModal = (media) => setModalMedia(media);
  const closeModal = () => setModalMedia(null);

  const handleDelete = async (mediaUrl) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this media?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `http://localhost:5050/api/portfolio/media/${userId}`,
        {
          data: { mediaUrl },
        }
      );

      // Refresh local state
      setPortfolio((prev) => ({
        ...prev,
        PastWorkMedia: prev.PastWorkMedia.filter((m) => m !== mediaUrl),
      }));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete media.");
    }
  };

  const renderMediaGrid = (mediaList = []) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {[...mediaList].reverse().map((media, index) => {
        const isVideo = media.match(/\.(mp4|webm|ogg)$/i);
        return (
          <div
            key={index}
            className="relative w-full h-64 bg-gray-200 rounded overflow-hidden group"
          >
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(media);
              }}
              className="absolute top-2 right-2 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition cursor-pointer z-10"
            >
              ❌
            </button>

            {/* Media Preview */}
            <div
              className="cursor-pointer w-full h-full"
              onClick={() => openModal(media)}
            >
              {isVideo ? (
                <video
                  src={media}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <img
                  src={media}
                  alt={`media-${index}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderModal = () => {
    if (!modalMedia) return null;
    const isVideo = modalMedia.match(/\.(mp4|webm|ogg)$/i);
    return (
      <div className="fixed inset-0 backdrop-blur-lg bg-white/10 flex items-center justify-center z-50">
        <button
          onClick={closeModal}
          className="absolute top-4 right-6 text-xl font-bold cursor-pointer"
        >
          ❌
        </button>
        {isVideo ? (
          <video
            src={modalMedia}
            controls
            className="max-h-[80vh] max-w-[90vw]"
          />
        ) : (
          <img
            src={modalMedia}
            alt="full-view"
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 pt-24">
        <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : portfolio ? (
          <>
            <p className="text-md text-gray-600 mb-2 font-medium">
              {portfolio.Type}
            </p>
            <p className="text-sm text-gray-700 mb-6">
              {portfolio.Description}
            </p>
            {portfolio.PastWorkMedia && portfolio.PastWorkMedia.length > 0 ? (
              renderMediaGrid(portfolio.PastWorkMedia)
            ) : (
              <p className="text-sm text-gray-500 italic">
                You have not uploaded any media to your portfolio.
              </p>
            )}
          </>
        ) : (
          <p>Loading portfolio...</p>
        )}

        {renderModal()}
      </div>
    </>
  );
};

export default PortfolioDisplay;
