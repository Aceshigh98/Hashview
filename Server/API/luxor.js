const axios = require("axios");
require("dotenv").config();

const apikey = process.env.API_KEY;

const workerDetails = async (userName, key) => {
  try {
    const response = await axios.post(
      "https://api.luxor.tech/graphql",
      {
        query: `
      query getWorkerDetails($uname: String!) {
        getWorkerDetails(duration: { days: 1 }, mpn: BTC, uname: $uname, first: 10) {
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
          uname: userName,
        },
      },
      {
        headers: {
          "x-lux-api-key": key,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = workerDetails;
