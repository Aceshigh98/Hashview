const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema(
  {
    revenue: { type: Number },
    date: { type: String },
  },
  { _id: false }
);

const mainSchema = new mongoose.Schema({
  userName: { type: String, unique: true, require: true },
  revenues: [revenueSchema],
  lastUpdated: { type: String },
});

const revenueModel = mongoose.model(
  "RevenueDetails",
  mainSchema,
  "revenue-details"
);

module.exports = revenueModel;
