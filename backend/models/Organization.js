const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Spending Schema
const SpendingSchema = new Schema(
  {
    EventID: { type: String, required: true }, // Keep this as String if IDs like "E001"
    
    // ✅ Now using ObjectId to reference Organization
    OrgID: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    AmountSpent: { type: Number, required: true },
    Date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Spending = mongoose.model("Spending", SpendingSchema);

// Organization Schema
const OrganizationSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, trim: true },
    Description: { type: String, default: "" },
    Email: { type: String, required: true, unique: true, lowercase: true },
    Industry: { type: String, default: "" },
    Address: { type: String, default: "" },
    AmountSpent: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    SpendingRecords: [{ type: Schema.Types.ObjectId, ref: 'Spending' }]  // Reference to spending records
  },
  { timestamps: true }
);

// Create the Organization model
const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = { Organization, Spending };
