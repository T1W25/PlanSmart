import React, { useState } from "react";
import axios from "axios";

//using 67d9acf452f588f77d3d63f9 to test
const PortfolioEditor = ({ modelId = "67d9acf452f588f77d3d63f9", initialPortfolio = null, entityType = "vendor" }) => {
  const [portfolio, setPortfolio] = useState(
    initialPortfolio || { Type: "", Description: "", PastWorkMedia: [], Awards: [] }
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [awardInput, setAwardInput] = useState(""); // Track award input

  // Handle Input Changes
  const handleChange = (e) => {
    setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
  };

  // Handle Awards Input (Press Enter to Add)
  const handleAwardAdd = (e) => {
    if (e.key === "Enter" && awardInput.trim() !== "") {
      e.preventDefault();
      setPortfolio({ ...portfolio, Awards: [...portfolio.Awards, awardInput.trim()] });
      setAwardInput(""); // Reset input
    }
  };

  // Handle File Selection & Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload Media to `/api/portfolio/upload/:modelId`
  const handleUpload = async () => {
    try {
      console.log(` Uploading media to /api/portfolio/upload/${modelId}...`);

      const formData = new FormData();
      formData.append("media", selectedFile);

      const uploadUrl = `http://localhost:5050/api/portfolio/upload/${modelId}`;

      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedFileUrl = response.data.mediaUrl;
      console.log(" Media Uploaded:", uploadedFileUrl);

      setPortfolio({ ...portfolio, PastWorkMedia: [...portfolio.PastWorkMedia, uploadedFileUrl] });

    } catch (error) {
      console.error(" Media Upload Error:", error.response ? error.response.data : error.message);
      alert("Error uploading media. Check console for details.");
    }
  };

  //Save or Update Portfolio (Text Fields)
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5050/api/portfolio/${modelId}`; // Using hardcoded ID

      console.log("Sending request to:", url);

      const response = await axios.put(url, {
        Type: portfolio.Type,
        Description: portfolio.Description, 
      });

      alert("Portfolio Updated Successfully!");
      console.log("Portfolio Saved:", response.data);

    } catch (error) {
      console.error("Save Portfolio Error:", error.response ? error.response.data : error.message);
      alert("Error saving portfolio. Check console for details.");
    }
  };


  return (
    <div className="bg-white shadow-md p-6 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Edit Portfolio</h2>
      <form onSubmit={handleSave} className="space-y-4">

        <input type="text" name="Type" value={portfolio.Type} placeholder="Type" className="w-full border p-2 rounded-md" onChange={handleChange} />
        <textarea name="Description" value={portfolio.Description} placeholder="Description" className="w-full border p-2 rounded-md h-24" onChange={handleChange}></textarea>

        {/* Media Upload Section */}
        <input type="file" accept="image/*, video/*" className="w-full border p-2 rounded-md" onChange={handleFileChange} />

        {/* Image or Video Preview */}
        {preview && (
          <div className="mt-4">
            {selectedFile && selectedFile.type.startsWith("video/") ? (
              <video src={preview} className="w-full rounded-md shadow-md" controls />
            ) : (
              <img src={preview} alt="Preview" className="w-full rounded-md shadow-md" />
            )}
          </div>
        )}

        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full" onClick={handleUpload}>
          Upload Media
        </button>

        {/* Awards Input */}
        <input
          type="text"
          placeholder="Add Award (Press Enter)"
          value={awardInput}
          onChange={(e) => setAwardInput(e.target.value)}
          onKeyDown={handleAwardAdd}
          className="w-full border p-2 rounded-md"
        />
        <ul>
          {portfolio.Awards.map((award, index) => (
            <li key={index} className="text-sm text-gray-600">{award}</li>
          ))}
        </ul>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
          Update Portfolio
        </button>
      </form>
    </div>
  );
};

export default PortfolioEditor;
