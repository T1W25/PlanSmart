const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  organizationName: { type: String, required: true },
  eventDetails: { type: String },
  date: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("Event", EventSchema);
