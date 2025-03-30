const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  Name: { type: String, required: true, trim: true },
  Description: { type: String, default: "" },
  Email: { type: String, required: true, unique: true, lowercase: true },
  Industry: { type: String, default: "" },
  Address: { type: String, default: "" },
  AmountSpent: {type:Number, default:0 },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Organization", OrganizationSchema);
