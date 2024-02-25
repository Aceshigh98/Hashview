
const mongoose = require('mongoose');
require('dotenv').config();


// MongoDB URI
const mongoURI = process.env.URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to MongoDB
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));


// Define a schema and model for the items and hashrates
const minerSchema = new mongoose.Schema ({
    minerId: String,
    workerName: String,
    status: String,
    hourlyHashrate: [{hashrate: String, date: Date}],
    dailyHashrate: [{hashrate: String, date: Date}],
    weeklyHashrate: [{hashrate: String, date: Date}],
    lastUpdated: Date,
});

const Schema = mongoose.model('MinerData', minerSchema, 'MinerData');

module.exports = Schema;

