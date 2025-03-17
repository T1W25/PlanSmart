const mongoose = require('mongoose');

const GuestSpeakerSchema = new mongoose.Schema({
  SpeakerID: { type: Number, required: true, unique: true },
  PortfolioID: { type: Number, required: true, ref: "Portfolio" }, // Foreign Key
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: { type: String, required: true },
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('GuestSpeaker', GuestSpeakerSchema);
