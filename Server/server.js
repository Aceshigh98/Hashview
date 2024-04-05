

const cors = require('cors');
const express = require('express');
const minerDetailsRoute = require('./routes/minersDetailsRoute');
const connectDB = require('./database/dbConfig');
require('./tasks/cronTasks');

connectDB(); // Establish the database connection


const app = express();

app.use(cors());

app.use(express.json()); // For parsing application/json

//Routes
app.use('/api/data', minerDetailsRoute); 

// Start Server
app.listen(80, () => {
    console.log('Server is running on port 80.');
});





 













