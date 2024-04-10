const mongoose = require("mongoose");

// Define a schema for the objects inside the miners array
const minerDetailSchema = new mongoose.Schema(
  {
    minerId: { type: String, required: true },
    workerName: { type: String },
    status: { type: String },
    hashrate: { type: Number },
    lastUpdated: { type: String },
  },
  { _id: false }
);

const minerSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  miners: [minerDetailSchema], // Use the schema defined above for miners array
}); // Optional: Prevent Mongoose from adding an _id to every miner if not needed

const minersModel = mongoose.model(
  "MinerDetails",
  minerSchema,
  "miner-details"
);

module.exports = minersModel;
