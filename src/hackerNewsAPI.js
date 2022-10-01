const axios = require('axios');
const { logger } = require('./utils/logger');

// TODO: move to props
const hackerNewsAPI = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com',
});

/**
 * Return the latest job stories
 * @param {number} limit
 * @returns {Promise<Array.<number>>}
 */
module.exports.getJobStories = async (limit) => {
  const response = await hackerNewsAPI.get('/v0/jobstories.json');
  return response.data.slice(0, limit);
};

/**
 * Return item details based on its id
 * @param {number} id
 * @returns {Object} item details
 */
module.exports.getItem = async (id) => {
  let response;
  try {
    response = await hackerNewsAPI.get(`/v0/item/${id}.json`);
  } catch (err) {
    logger.log('error', `${id} call finished with an error:\n${err}`);
    throw err;
  }
  return response.data;
};

/**
 * @returns {Promise<number>} max id
 */
module.exports.getMaxItemId = async () => {
  const response = await hackerNewsAPI.get('/v0/maxitem.json');
  return parseInt(response.data, 10);
};
