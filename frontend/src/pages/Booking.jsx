// src/pages/Booking.jsx
import React from 'react';
import BookingRequest from '../components/BookingRequest';  // Import the BookingRequest component

const Booking = () => {
  const request = {
    image: 'path-to-image.jpg',  // Add your image path here
    event: 'Sample Event',
    address: '123 Sample Address',
    date: '2025-03-30',
    attendees: 100,
    vendor: 'Event Vendor',
  };

  return (
    <div>
      <h1>Booking Page</h1>
      <BookingRequest request={request} /> {/* Use BookingRequest component and pass the data */}
    </div>
  );
};

export default Booking;
