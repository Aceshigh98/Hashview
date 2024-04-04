const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
require('dotenv').config();

// MongoDB URI
const mongoURI = process.env.URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

  
  
  
  
  const hashrateSchema = new mongoose.Schema({
    hashrate: String,
    date: Date
  }, { _id: false }); // Prevents Mongoose from adding an _id to every hashrate entry

  const revenueSchema = new mongoose.Schema({
    revenue: Number,
    date: Date
  }, { _id: false }); 
  
  const minerSchema = new mongoose.Schema({
    minerId: { type: String, required: true },
    workerName: { type: String, required: true },
    status: { type: String, required: true },
    dailyRevenue: [revenueSchema],
    lastUpdated: { type: Date, default: Date.now },
    hourlyHashrate: [hashrateSchema],
    dailyHashrate: [hashrateSchema],
    weeklyHashrate: [hashrateSchema]
  }, { _id: false }); // Optional: Prevent Mongoose from adding an _id to every miner if not needed
  
  
  
  
  
  
  const hashrate = new mongoose.Schema({
    lastUpdated: { type: Date, default: Date.now },
    hourlyHashrate: [hashrateSchema],
    dailyHashrate: [hashrateSchema],
    weeklyHashrate: [hashrateSchema]
  }, { _id: false }); // Optional: Prevent Mongoose from adding an _id to every miner if not needed
  

  hashrate.pre('save', function(next) {
    this.miners.forEach((miner) => {
      // Check and adjust the size of each hashrate array
      ['hourlyHashrate', 'dailyHashrate', 'weeklyHashrate'].forEach(rateType => {
        if (miner[rateType].length > 5) {
          // Keep only the last 5 elements (most recent based on insertion)
          miner[rateType] = miner[rateType].slice(0, 5);
        }
      });
    });
  
    next();
  });


  
  
  
  
  
  const userSchema = new mongoose.Schema({
    // Assuming users are identified by a username or another unique identifier
    username: { type: String, unique: true, required: true },
    miners: [minerSchema],
    chartHashrate: [hashrate],
  });


const UserModel = mongoose.model('MinerDetails', userSchema, "users");

module.exports = UserModel;


