import React from "react";
import EventCard from "./EventCards";

const EventList = ({ events = [], onDelete }) => {
  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="text-center text-gray-500 italic">
        No events found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event._id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default EventList;
