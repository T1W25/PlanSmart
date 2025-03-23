import React, { useState } from "react";
import "./BookingRequest.css";

const BookingRequest = ({ request }) => {
  const [status, setStatus] = useState("Pending");

  const handleAccept = () => setStatus("Accepted");
  const handleDecline = () => setStatus("Declined");

  return (
    <div>
        
    </div>
  );
};

export default BookingRequest;