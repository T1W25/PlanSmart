const mongoose = require("mongoose");

const EventInvite = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  providerType: { type: String, enum: ["Vendor", "GuestSpeaker", "TransportationProvider"], required: true },
  providerName: { type: String },
  status: { type: String, enum: ["pending", "accepted", "rejected","Completed"], default: "pending" },
  notes: { type: String },
  lastUpdated: { type: Date, default: Date.now },
  rate: { type: Number, required: true},
});

module.exports = mongoose.model("EventInvite", EventInvite);
