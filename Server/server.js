const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI and database name
const mongoURI = process.env.URI;
const dbName = process.env.DBNAME;

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle adding data to MongoDB
app.post('/addData', async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    const db = client.db(dbName);

    const fetchGraphQLData = require("./scripts/minerData");

    // Call the fetchData function to get the data
    const dataArray = await fetchGraphQLData();

    // Iterate over each data object
    for (const data of dataArray) {
      // Check if the data already exists in the database
      const existingData = await db.collection('MinerData').findOne({ minerId: data.minerId });

      if (existingData) {
        // If the data already exists, update the existing document
        const result = await db.collection('MinerData').updateOne(
          { minerId: data.minerId },
          { $set: data }
        );

        console.log('Data updated:', result.modifiedCount);
      } else {
        // If the data doesn't exist, insert it as a new document
        const result = await db.collection('MinerData').insertOne(data);
        console.log('Data inserted:', result.insertedId);
      }
    }

    // Close the connection
    await client.close();

    res.status(201).send('Data inserted/updated successfully');
  } catch (error) {
    console.error('Error inserting/updating data:', error);
    res.status(500).send('Error inserting/updating data');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






