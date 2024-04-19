const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    value: { type: Number },
    date: { type: Date },
  },
  { _id: false }
);

const revenueChartValues = new mongoose.Schema(
  {
    daily: [entrySchema],
    weekly: [entrySchema],
    monthly: [entrySchema],
  },
  { _id: false }
);

const revenueTableValues = new mongoose.Schema(
  {
    daily: [entrySchema],
    weekly: [entrySchema],
    monthly: [entrySchema],
  },
  { _id: false }
);

const hashrateChartValues = new mongoose.Schema(
  {
    daily: [entrySchema],
    weekly: [entrySchema],
    monthly: [entrySchema],
  },
  { _id: false }
);

const minerSchema = new mongoose.Schema(
  {
    minerId: { type: String, required: true },
    workerName: { type: String },
    status: { type: String },
    hashrate: { type: Number },
    revenueTable: revenueTableValues,
    revenueChart: revenueChartValues,
    hashrateChart: hashrateChartValues,
  },
  { _id: false }
);

const minersDetailsSchema = new mongoose.Schema({
  userName: { type: String, require: true },
  miners: [minerSchema],
  lastUpdated: { type: String },
});

const minersModel = mongoose.model("Miners-Details", minersDetailsSchema);

module.exports = minersModel;
