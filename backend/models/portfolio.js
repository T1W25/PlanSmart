const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  VendorID: Number,
  Name: String,
  Email: String,
  Phone: String,
  isVerified: Boolean,
  Status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' }
});

const GuestSpeakerSchema = new mongoose.Schema({
  SpeakerID: Number,
  Name: String,
  Email: String,
  Phone: String,
  isVerified: Boolean,
});

const TransportationProviderSchema = new mongoose.Schema({
  ProviderID: Number,
  Name: String,
  Email: String,
  Phone: String,
  isVerified: Boolean,
});

const PortfolioSchema = new mongoose.Schema({
  PortfolioID: Number,
  Type: String,
  Description: String,
  Vendors: [VendorSchema],
  GuestSpeakers: [GuestSpeakerSchema],
  TransportationProviders: [TransportationProviderSchema]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
