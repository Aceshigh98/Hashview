const mongoose = require("mongoose");

const mainSchema = new mongoose.Schema({
  userName: { type: String, unique: true, require: true },
  revenue: { type: Number },
  lastUpdated: { type: String },
});

const revenueModel = mongoose.model(
  "RevenueDetails",
  mainSchema,
  "revenue-details"
);

module.exports = revenueModel;
