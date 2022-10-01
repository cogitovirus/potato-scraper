const MongoDBClient = require('../client/MongoDBClient');
const { logger } = require('../../utils/logger');

const client = new MongoDBClient();

const DB_NAME = 'potato-scraper';
const DB_COLLECTION = 'HNJobPostings';

module.exports.insertOneJobPosting = async (jobPosting) => {
  const db = await client.db(DB_NAME);

  try {
    await db.collection(DB_COLLECTION).insertOne(jobPosting);
    logger.log('info', `job posting ${jobPosting.id} added to DB`);
  } catch (err) {
    logger.log('error', `failed inserting ${jobPosting} to ${DB_COLLECTION}`);
    // TODO: do something
    throw err;
  }
};

module.exports.insertManyJobPostings = async (jobPostings) => {
  const db = await client.db(DB_NAME);

  try {
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await db.collection(DB_COLLECTION).insertMany(jobPostings, options);
    logger.log('info', `${result.insertedCount} document(s) inserted`);
  } catch (err) {
    logger.log('error', 'unable to insert job posting');
    throw err;
  }
};

/**
 * @returns {Promise<number>} - max id or 0 if collection is empty
 */
module.exports.getMaxItemId = async () => {
  const db = await client.db(DB_NAME);
  const results = await db.collection(DB_COLLECTION).find({}, { id: 1 }).sort({ id: -1 }).limit(1)
    .toArray();

  if (!results.length) {
    return 0;
  }
  return parseInt(results[0].id, 10);
};
