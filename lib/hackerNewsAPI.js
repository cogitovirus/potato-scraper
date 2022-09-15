const axios = require('axios');

const hackerNewsAPI = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com',
});

/**
 * Return the latest job stories
 * @param {number} limit
 * @returns {Array.<number>}
 */
module.exports.getJobStories = async (limit) => {
  const response = await hackerNewsAPI.get('/v0/jobstories.json');
  return response.data.slice(0, limit);
};

/**
 * Return job details based on the jobID
 * @param {number} jobID - unique id of the job offer
 * @returns {object} jobDetails
 */
module.exports.getJobDetails = async (jobID) => {
  let response;
  try {
    response = await hackerNewsAPI.get(`/v0/item/${jobID}.json`);
  } catch (err) {
    console.log(`${jobID} call finished with an error:\n${err}\nskipping`);
    throw err;
  }

  return response.data;
};
