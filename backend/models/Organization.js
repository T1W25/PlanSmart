const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  contactInformation: String,
  spendingHistory: [
    {
      eventName: String,
      amountSpent: Number,
      date: Date,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Organization", OrganizationSchema);