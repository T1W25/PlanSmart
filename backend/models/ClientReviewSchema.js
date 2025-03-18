const mongoose = require("mongoose");

const ClientReviewSchema = new mongoose.Schema({
    clientName: { type: String, required: false },
    rating: { type: Number, required: false, min: 1, max: 5 },
    reviewText: { type: String, required: false },
    date: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('ClientReview', ClientReviewSchema);