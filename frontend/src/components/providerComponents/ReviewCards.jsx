import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { getUser } from "../../utils/auth";

const ReviewCards = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const user = getUser();
  const userId = user?.providerID;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) {
        setError("User not found.");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reviews/${userId}`);
        setReviews(response.data.reviews || []); 
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Unable to load reviews.");
      }
    };

    fetchReviews();
  }, [userId]);

  return (
    <div className="w-full space-y-4 mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Client Reviews</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {reviews.length === 0 && !error && <p className="text-gray-500 text-center">No reviews yet.</p>}

      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          clientName={review.clientName}
          rating={review.rating}
          reviewText={review.reviewText}
          date={review.date}
        />
      ))}
    </div>
  );
};

export default ReviewCards;
