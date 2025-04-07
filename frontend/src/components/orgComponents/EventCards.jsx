import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();

  const isPastEvent = new Date(event.date) < new Date();
  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold">{event.eventName}</h3>
          <p className="text-sm text-gray-600">
            📍 {event.location || "Location not set"}
          </p>
          <p className="text-sm text-gray-600">
            📅 {new Date(event.date).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-700">
            👥 Guests: {event.numberOfGuests}
          </p>
          <p className="text-sm text-gray-500">🏢 {event.organizationName}</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        {event.eventDescription || "No description provided."}
      </p>

      {/* Providers */}
      {event.providers?.length > 0 && (
        <div className="mt-2 mb-4 space-y-1">
          {event.providers.map((p, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm text-gray-700"
            >
              <span>
                {p.providerName} ({p.providerType}) - ${p.rate || "N/A"} -{" "}
                <span
                  className={`font-semibold px-1  rounded ${
                    p.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : p.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}

      {isPastEvent && (
        <p className="text-sm text-red-500 font-medium mb-2">
          This event date has passed.
        </p>
      )}

      {/* Buttons Section */}
      <div className="mt-4 flex space-x-4 justify-end">
        <button
          onClick={() => navigate(`/edit-event/${event._id}`)}
          disabled={isPastEvent}
          className={`px-4 py-2 rounded-lg focus:outline-none cursor-pointer ${
            isPastEvent
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-100 text-black hover:bg-gray-300"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event._id)}
          disabled={isPastEvent}
          className={`px-4 py-2 rounded-lg focus:outline-none cursor-pointer ${
            isPastEvent
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
