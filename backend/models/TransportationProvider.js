const mongoose = require('mongoose');
const PortfolioSchema = require('./Portfolio');
const ClientReviewSchema = require('./ClientReviewSchema')

const TransportationProviderSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  Portfolio: { type: PortfolioSchema },
  Reviews: [ClientReviewSchema]  
});

module.exports = mongoose.model('TransportationProvider', TransportationProviderSchema);
