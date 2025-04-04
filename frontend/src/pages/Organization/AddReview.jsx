import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getUser } from "../../utils/auth";

const ReviewForm = ({ onSubmitSuccess }) => {
    
    const { id } = useParams();
    const user = getUser();

    const [formData, setFormData] = useState({
    clientName: user?.name || "",
    rating: 1,
    reviewText: ""
  });

  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    const fetchProviderName = async () => {
      try {
        const endpoints = [
          `http://localhost:5050/api/vendors/${id}`,
          `http://localhost:5050/api/guest-speakers/${id}`,
          `http://localhost:5050/api/transportation-providers/${id}`
        ];

        for (let url of endpoints) {
          const res = await axios.get(url);
          if (res?.data?.Name) {
            setProviderName(res.data.Name);
            break;
          }
        }
      } catch (err) {
        console.error("Error fetching provider name:", err.message);
      }
    };

    fetchProviderName();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5050/api/reviews/${id}`, formData);
      if (onSubmitSuccess) onSubmitSuccess();
      setFormData({ clientName: "", rating: 1, reviewText: "" });
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 border rounded-lg shadow-md mt-25 mb-10">
      <h2 className="text-xl font-bold mb-4">Submit a Review for <span className="text-gray-500">{providerName || "..."}</span> </h2>

      <label className="block mb-2 text-sm font-medium">Your Organization Name</label>
      <input
        type="text"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        disabled
        className="w-full border border-gray-300 p-2 rounded mb-4 cursor-not-allowed"
        placeholder="Your name (optional)"
      />

      <label className="block mb-2 text-sm font-medium">Rating</label>
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      >
        {[1, 2, 3, 4, 5].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>

      <label className="block mb-2 text-sm font-medium">Review</label>
      <textarea
        name="reviewText"
        value={formData.reviewText}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Write your review..."
        rows="4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit Review
      </button>
    </form>
    </>
  );
};

export default ReviewForm;
