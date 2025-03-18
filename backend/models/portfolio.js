const mongoose = require('mongoose');
const ClientReviewSchema = require('./ClientReviewSchema')

const PortfolioSchema = new mongoose.Schema({
  Type: { type: String, required: false },
  Description: { type: String },
  PastWorkMedia: { type: String }
});

module.exports = PortfolioSchema;