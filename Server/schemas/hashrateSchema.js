const mongoose = require("mongoose");

const hashrate = new mongoose.Schema(
  {
    hashrate: String,
    date: Date,
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
  lastUpdated: { type: Date, default: Date.now },
  hashrates: [miners],
}); // Optional: Prevent Mongoose from adding an _id to every miner if not needed

mainSchema.pre("save", function (next) {
  // Iterate over the 'hashrates' array (which contains 'miners')
  this.hashrates.forEach((miner) => {
    // For each 'miner', limit the 'hourlyHashrate', 'dailyHashrate', 'weeklyHashrate' arrays to the last 5 elements
    ["hourlyHashrate", "dailyHashrate", "weeklyHashrate"].forEach(
      (rateType) => {
        if (miner[rateType] && miner[rateType].length > 5) {
          miner[rateType] = miner[rateType].slice(-5); // Keep only the last 5 elements
        }
      }
    );
  });

  next();
});

const hashRateModel = mongoose.model(
  "Chart-details",
  mainSchema,
  "chart-hashrate"
);

module.exports = hashRateModel;
