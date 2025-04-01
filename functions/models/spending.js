const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpendingSchema = new Schema(
  {
    EventID: { type: Number, required: true },
    OrgID: { type: Number, required: true },
    AmountSpent: { type: Number, required: true },
    Date: { type: Date, required: true }
  },
  {
    timestamps: true // this will add createdAt and updatedAt fields automatically
  }
);

// Create the model
const Spending = mongoose.model('Spending', SpendingSchema);

module.exports = Spending;
