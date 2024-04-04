require('./tasks/cronTasks');
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const minerDetailsRoute = require('./routes/minersDetailsRoute');

const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json


//Routes
app.use('/api/data', minerDetailsRoute); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Start Server
app.listen(80, () => {
    console.log('Server is running on port 80.');
});





 













