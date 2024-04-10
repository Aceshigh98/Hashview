const mongoose = require("mongoose");

const hashrate = new mongoose.Schema(
  {
    hashrate: { type: String },
    date: { type: String },
  },
  { _id: false }
); // Prevents Mongoose from adding an _id to every hashrate entry

const miners = new mongoose.Schema(
  {
    minerId: { type: String },
    hourlyHashrate: [hashrate],
    dailyHashrate: [hashrate],
    weeklyHashrate: [hashrate],
  },
  { _id: false }
);

const mainSchema = new mongoose.Schema({
  userName: { type: String },
  lastUpdated: { type: String },
  hashrates: [miners],
});

mainSchema.pre("save", function (next) {
  // Iterate over the 'hashrates' array (which contains 'miners')
  this.hashrates.forEach((miner) => {
    // For each 'miner', limit the 'hourlyHashrate', 'dailyHashrate', 'weeklyHashrate' arrays to the last 5 elements
    ["hourlyHashrate", "dailyHashrate", "weeklyHashrate"].forEach(
      (rateType) => {
        if (miner[rateType] && miner[rateType].length > 5) {
          miner[rateType] = miner[rateType].slice(-7); // Keep only the last 5 elements
        }
      }
    );
  });

  next();
});

const hashRateModel = mongoose.model(
  "HashrateDetails",
  mainSchema,
  "hashrate-details"
);

module.exports = hashRateModel;
