const mongoose = require('mongoose');

const hashrateSchema = new mongoose.Schema({
  hashrate: String,
  date: Date
}, { _id: false });

const revenueSchema = new mongoose.Schema({
  revenue: Number,
  date: Date
}, { _id: false });

// Define a schema for the objects inside the miners array
const minerDetailSchema = new mongoose.Schema({
  minerId: { type: String, required: true },
  workerName: { type: String },
  status: { type: String },
  dailyRevenue: [revenueSchema],
  lastUpdated: { type: Date, default: Date.now },
  hourlyHashrate: [hashrateSchema],
  dailyHashrate: [hashrateSchema],
  weeklyHashrate: [hashrateSchema]
});

const minerSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  miners: [minerDetailSchema] // Use the schema defined above for miners array
});// Optional: Prevent Mongoose from adding an _id to every miner if not needed

const minersModel = mongoose.model('MinerDetails', minerSchema, "miner-details");

module.exports = minersModel;



