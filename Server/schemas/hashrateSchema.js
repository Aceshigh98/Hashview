const mongoose = require("mongoose");

const hashrate = new mongoose.Schema(
  {
    minerId: String,
    hashrate: String,
    date: Date,
  },
  { _id: false }
); // Prevents Mongoose from adding an _id to every hashrate entry

const mainSchema = new mongoose.Schema({
  userName: { type: String },
  lastUpdated: { type: Date, default: Date.now },
  hourlyHashrate: [hashrate],
  dailyHashrate: [hashrate],
  weeklyHashrate: [hashrate],
}); // Optional: Prevent Mongoose from adding an _id to every miner if not needed

mainSchema.pre("save", function (next) {
  // Assuming you want to limit the number of hashrate entries in each array
  [
    "hashrate.$.hourlyHashrate",
    "hashrate.$.dailyHashrate",
    "hashrate.$.weeklyHashrate",
  ].forEach((rateType) => {
    if (this[rateType] && this[rateType].length > 5) {
      // Keep only the last 5 elements (most recent based on insertion)
      this[rateType] = this[rateType].slice(-5);
    }
  });

  next();
});

const hashRateModel = mongoose.model(
  "Chart-details",
  mainSchema,
  "chart-hashrate"
);

module.exports = hashRateModel;
