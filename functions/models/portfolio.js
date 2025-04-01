//This is a Schema
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  Type: { type: String, required: false },
  Description: { type: String },
  PastWorkMedia: [{ type: String }],
  Awards: [{ type: String }],
});

module.exports = PortfolioSchema;