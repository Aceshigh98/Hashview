const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
require('dotenv').config();

// MongoDB URI
const mongoURI = process.env.URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

  const hashrateSchema = new mongoose.Schema({
    hashrate: String,
    date: Date
  }, { _id: false }); // Prevents Mongoose from adding an _id to every hashrate entry
  
  const minerSchema = new mongoose.Schema({
    minerId: { type: String, required: true },
    workerName: { type: String, required: true },
    status: { type: String, required: true },
    revenue: {type: Number, required: true},
    lastUpdated: { type: Date, default: Date.now },
    hourlyHashrate: [hashrateSchema],
    dailyHashrate: [hashrateSchema],
    weeklyHashrate: [hashrateSchema]
  }, { _id: false }); // Optional: Prevent Mongoose from adding an _id to every miner if not needed
  
  const userSchema = new mongoose.Schema({
    // Assuming users are identified by a username or another unique identifier
    username: { type: String, unique: true, required: true },
    miners: [minerSchema]
  });


const UserModel = mongoose.model('MinerDetails', userSchema, "users");

module.exports = UserModel;


