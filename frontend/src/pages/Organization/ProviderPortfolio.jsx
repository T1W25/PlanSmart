// src/pages/ProviderPortfolio.jsx (view-only)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";

const ProviderPortfolio = () => {
  const { providerType, id, name } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);
  const [modalMedia, setModalMedia] = useState(null);

  useEffect(() => {
    const normalized = providerType?.toLowerCase().replace(/\s/g, "-");
    const routeMap = {
      vendor: "vendors",
      vendors: "vendors",
      "guest-speaker": "guest-speakers",
      "guest-speakers": "guest-speakers",
      "transportation-provider": "transportation-providers",
      "transportation-providers": "transportation-providers",
    };

    const endpoint = routeMap[normalized];
    if (!endpoint || !id) return;

    axios
    axios
    .get(`${import.meta.env.VITE_API_URL}/api/${endpoint}/${id}`)
    .then((res) => {
      const data = res.data?.Portfolio;
      if (!data || (!data.Type && !data.Description && (!data.PastWorkMedia || data.PastWorkMedia.length === 0))) {
        setError("This user has no portfolio.");
      } else {
        setPortfolio(data);
      }
    })  
  }, [providerType, id]);

  const openModal = (media) => setModalMedia(media);
  const closeModal = () => setModalMedia(null);

  const renderMediaGrid = (mediaList = []) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {[...mediaList].reverse().map((media, index) => {
        const isVideo = media.match(/\.(mp4|webm|ogg)$/i);
        return (
          <div
            key={index}
            className="relative w-full h-64 bg-gray-200 rounded overflow-hidden group"
            onClick={() => openModal(media)}
          >
            {isVideo ? (
              <video src={media} className="w-full h-full object-cover" muted />
            ) : (
              <img
                src={media}
                alt={`media-${index}`}
                className="w-full h-full object-cover"
              />
            )}
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
            <div className="cursor-pointer">
            {portfolio.PastWorkMedia && portfolio.PastWorkMedia.length > 0 ? (
              renderMediaGrid(portfolio.PastWorkMedia)
            ) : (
              <p className="text-sm text-gray-500 italic">
                This user has not uploaded any image.
              </p>
            )}</div>
          </>
        ) : (
          <p>Loading portfolio...</p>
        )}

        {renderModal()}
      </div>
    </>
  );
};

export default ProviderPortfolio;
