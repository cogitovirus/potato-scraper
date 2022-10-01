const MongoDBClient = require('../client/MongoDBClient');
const { logger } = require('../../utils/logger');

const client = new MongoDBClient();

const DB_NAME = 'potato-scraper';
const DB_COLLECTION = 'HNJobPostings';
module.exports.insertJobPosting = async (jobPosting) => {
  const db = await client.db(DB_NAME);

  try {
    await db.collection(DB_COLLECTION).insertOne(jobPosting);
  } catch (err) {
    logger.log('error', `failed inserting ${jobPosting} to ${DB_COLLECTION}`);
    // TODO: do something
    throw err;
  }
};
