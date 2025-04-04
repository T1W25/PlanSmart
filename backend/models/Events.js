const mongoose = require("mongoose");

const ProviderSubSchema = new mongoose.Schema({
  providerID: { type: mongoose.Schema.Types.ObjectId, required: true },
  providerType: {
    type: String,
    enum: ["TransportationProvider", "Vendor", "GuestSpeaker"],
    required: true
  },
  providerName: { type: String, required: true },
}, { _id: false });

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  organizationName: { type: String, required: true },
  eventDescription: { type: String },
  date: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  location: {type: String},
  rate: { type: Number, required: true},
  providers: [ProviderSubSchema],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Event", EventSchema);
