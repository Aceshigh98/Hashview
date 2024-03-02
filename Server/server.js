const cron = require('node-cron');
const cors = require('cors');
const express = require('express');
const Schema = require('./database/dbSchema');

// Assuming updateHashrate is a function defined in dbSchema.js
const updateHashrate = require('./database/dbSchema').updateHashrate;

// Schedule the hashrate updates
cron.schedule('* * * * *', () => updateHashrate('hourly')); // Every minute
cron.schedule('*/2 * * * *', () => updateHashrate('daily')); // Every 2 minutes
cron.schedule('*/3 * * * *', () => updateHashrate('weekly')); // Every 3 minutes

const app = express();

app.use(cors());

app.get('/api/data', async (req, res) => {
    try {
        const data = await Schema.find();
        res.json(data); 
    } catch(error) {
        console.log('Error fetching Data: ', error);
        res.status(500).json({message: 'Internal server error'})
    }
});

// Start Server
app.listen(80, () => {
    console.log('Server is running on port 80.');
});



















