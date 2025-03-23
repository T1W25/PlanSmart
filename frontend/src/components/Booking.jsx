import React, { useState } from "react";

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