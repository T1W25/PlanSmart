const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  Type: { type: String, required: false },
  Description: { type: String }
});

module.exports = PortfolioSchema;