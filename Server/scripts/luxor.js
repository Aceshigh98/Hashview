const axios = require('axios');
require('dotenv').config();


const apikey = process.env.API_KEY;

const workerDetails = async () => { // Replace YOUR_API_KEY with your Luxor API key


  try {
    const response = await axios.post('https://api.luxor.tech/graphql', {
      query: `
      query getWorkerDetails {
        getWorkerDetails(duration: { days: 1 }, mpn: BTC, uname: "aceshigh98", first: 10) {
          edges {
            node {
              minerId
              workerName
              miningProfileName
              updatedAt
              status
              hashrate
              validShares
              staleShares
              invalidShares
              lowDiffShares
              badShares
              duplicateShares
              revenue
              efficiency
            }
          }
        }
      }
      `,
      variables: {
        duration: { days: 1 },
        uname: "aceshigh98", // Replace your_username with your actual username
        first: 10,
      },
    }, {
      headers: {
        "x-lux-api-key": apikey,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = workerDetails;



  
   
