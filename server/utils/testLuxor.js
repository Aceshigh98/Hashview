const axios = require("axios");

const statusCheck = async (userName, key) => {
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

    if (response.status === 200) {
      console.log("post is successful");
      return 200;
    } else {
      console.log("Post has failed1");
      return response.status;
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.log("Post has failed");
      return 500;
    } else {
      console.log("Returned 500");
      return 500; // Internal Server Error
    }
  }
};

module.exports = statusCheck;
