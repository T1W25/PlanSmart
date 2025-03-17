// backend/models/Portfolio.js


const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  PortfolioID: { type: Number, required: true, unique: true },
  Type: { type: String, required: true },
  Description: { type: String, required: true }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
