import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const Booking = () => {
  const [selectedRange, setSelectedRange] = useState({ from: undefined, to: undefined });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [bookingInfo, setBookingInfo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    setTimeout(() => {
      setLoading(false);
      setBookingInfo({
        name: event.target.name.value,
        email: event.target.email.value,
        details: event.target.details.value,
        dates: selectedRange,
      });
      setMessage({ type: 'success', content: 'Booking successful!' });
    }, 2000);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-header">Book Your Event</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <label className="booking-label">Select your dates:</label>
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={setSelectedRange}
          className="date-picker"
        />
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="form-input"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          className="form-input"
          required
        />
        <textarea
          name="details"
          placeholder="Event Details"
          className="form-textarea"
          required
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
        {message.content && (
          <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
            {message.content}
          </div>
        )}
        {bookingInfo && (
          <div className="booking-info">
            <h2>Booking Confirmation</h2>
            <p>Name: {bookingInfo.name}</p>
            <p>Email: {bookingInfo.email}</p>
            <p>
              Event Dates:
              {`${bookingInfo.dates.from?.toLocaleDateString()} to ${bookingInfo.dates.to?.toLocaleDateString()}`}
            </p>
            <p>Details: {bookingInfo.details}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Booking;