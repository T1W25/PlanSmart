import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-bold">{event.eventName}</h3>
          <p className="text-sm text-gray-600">📍 {event.location || "Location not set"}</p>
          <p className="text-sm text-gray-600">📅 {new Date(event.date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">👥 Guests: {event.numberOfGuests}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-sm text-gray-500 italic">Rate: ${event.rate}</p>
          <p className="text-sm text-gray-500">Organization: {event.organizationName}</p>
        </div>
      </div>

      <p className="text-gray-600 mt-2">{event.eventDescription || "No description provided."}</p>

      {/* Providers section moved here */}
      {event.providers && event.providers.length > 0 && (
        <div className="text-sm text-gray-700 mt-4">
          <p className="font-semibold">Service Providers:</p>
          {event.providers.map((p, index) => (
            <p key={index}>
              {p.providerName} <span className="italic text-gray-500">({p.providerType})</span>
            </p>
          ))}
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-4 flex space-x-4 justify-end">
        <button className="px-4 py-2 bg-blue-100 text-black rounded-lg hover:bg-gray-300 focus:outline-none cursor-pointer">
          Edit
        </button>
        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
