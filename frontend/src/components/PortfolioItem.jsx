const PortfolioItem = ({ Type, Description, PastWorkMedia = [] }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="font-semibold">{Type}</h3>
      <p className="text-sm text-gray-600">{Description}</p>

      {/* Display Uploaded Media (Images & Videos) */}
      {PastWorkMedia.length > 0 &&
        PastWorkMedia.map((media, index) => (
          <div key={index} className="mt-2">
            {media.endsWith(".mp4") || media.endsWith(".mov") || media.endsWith(".avi") ? (
              <video src={media} className="w-full h-40 object-cover rounded-md" controls />
            ) : (
              <img src={media} alt="Portfolio" className="w-full h-40 object-cover rounded-md" />
            )}
          </div>
        ))}
    </div>
  );
};

export default PortfolioItem;
