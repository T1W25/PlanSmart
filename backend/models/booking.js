const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  FullName: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  EventDetails: { type: String, required: true },
  Location: { type: String },           // ✅ NEW
  Guests: { type: Number },             // ✅ NEW
  OrgID: { type: Number },
  VendorID: { type: Number },
  EventID: { type: Number },
  SpeakerID: { type: Number },
  ProviderID: { type: Number },
  Date: { type: Date, required: true },
  Status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);