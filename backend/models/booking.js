const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    OrgID: { type: Number, required: true },
    VendorID: { type: Number, required: true },
    EventID: { type: Number, required: true },
    SpeakerID: { type: Number, required: true },
    ProviderID: { type: Number, required: true },
    Date: { type: Date, required: true },
    Status: { type: String, required: true, default: "Confirmed" },
    FullName: { type: String, required: true },
    EmailAddress: { type: String, required: true },
    EventDetails: { type: String, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
