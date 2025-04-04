const mongoose = require('mongoose');
const PortfolioSchema = require('./Portfolio');
const ClientReviewSchema = require('./ClientReviewSchema');
const bcrypt = require("bcryptjs");

const TransportationProviderSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Phone: { type: String, required: false },
  ProviderType: { type: String, default: "Transportation Provider" },
  isAvailable: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  Portfolio: { type: PortfolioSchema },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  ProfilePhoto: { type: String },
  Reviews: [ClientReviewSchema],
  Events: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
      status: {
        type: String,
        enum: ["accepted", "declined", "pending"],
        default: "pending"
      },
      respondedAt: { type: Date, default: Date.now }
    }
  ]
});

// Pre-save hook
TransportationProviderSchema.pre("save", async function (next) {

  if (this.Reviews.length > 0) {
    const sum = this.Reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    const avg = sum / this.Reviews.length;
    this.rating = Math.round(avg);
  } else {
    this.rating = 0;
  }

  next();
});

module.exports = mongoose.model("TransportationProvider", TransportationProviderSchema);