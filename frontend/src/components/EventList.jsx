import React from "react";
import EventCard from "./EventCards";

const EventList = ({ events }) => {
  if (!Array.isArray(events)) {
    return <p className="text-red-500">Error: Event list is not valid.</p>;
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
