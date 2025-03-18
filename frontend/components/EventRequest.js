import React from "react";

const EventRequest = ({ event }) => {
  return (
    <div style={styles.card}>
      {event.image && <img src={event.image} alt={event.name} style={styles.image} />}
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      {event.date && <p><strong> Event Date:</strong> {event.date}</p>}
    </div>
  );
};

// Simple inline CSS styles
const styles = {
  card: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

export default EventRequest;
