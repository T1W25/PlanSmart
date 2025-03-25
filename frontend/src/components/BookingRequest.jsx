// src/components/BookingRequest.jsx
import React, { useState } from "react";

const BookingRequest = ({ request }) => {
  const [status, setStatus] = useState("Pending");

  const statusColors = {
    Pending: "bg-yellow-400 text-black",
    Accepted: "bg-green-500 text-white",
    Declined: "bg-red-500 text-white",
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-center text-xl font-bold mb-3">Bookings</h2>

      <div className="flex justify-center gap-2 mb-4">
        {["All", "Accepted", "Declined", "Pending"].map((filter) => (
          <button key={filter} className="px-3 py-2 border font-bold">
            {filter}
          </button>
        ))}
      </div>

      <div className="flex items-center p-4 border rounded-lg">
        <img src={request.image} alt="Event" className="w-20 h-20 rounded mr-3" />
        <div>
          <h3 className="font-semibold">{request.event}</h3>
          <p className="text-gray-600">{request.address}</p>
          <p className="text-gray-600">{request.date}</p>
          <p className="text-gray-600">{request.attendees} Attendees</p>
          <p className="font-bold">{request.vendor}</p>

          <span className={`inline-block px-3 py-1 rounded font-bold mt-2 ${statusColors[status]}`}>
            {status}
          </span>

          {status === "Pending" && (
            <div className="mt-3">
              <button className="px-4 py-2 mr-2 bg-green-500 text-white rounded" onClick={() => setStatus("Accepted")}>
                Accept
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setStatus("Declined")}>
                Decline
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRequest;
