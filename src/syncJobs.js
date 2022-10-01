const JobModel = require('./db/model/JobModel');
const hnAPI = require('./hackerNewsAPI');
const { logger } = require('./utils/logger');

/**
 * TODO: add a doc
 */
module.exports.syncJobs = async (concurrencyLimit = 1, startingIndexOverride) => {
  const mongoMaxItemId = await JobModel.getMaxItemId();
  const startAtIndex = startingIndexOverride || mongoMaxItemId;

  const hnMaxItemId = await hnAPI.getMaxItemId();
  const outOfBoundsTrigger = hnMaxItemId + 1;

  logger.log('info', `running sync job. start at index: ${startAtIndex}, hacker news max: ${hnMaxItemId}`);

  // outer loop for all the missing items
  for (let i = startAtIndex + 1; i < hnMaxItemId; i += concurrencyLimit) {
    logger.log('info', `sync job at index: ${i}`);
    const itemPromises = [];
    const batchEnd = i + concurrencyLimit;
    // inner loop for one batch
    for (let n = i; n < batchEnd; n += 1) {
      if (n === outOfBoundsTrigger) {
        break;
      }
      itemPromises.push(hnAPI.getItem(n));
    }
    // TODO: error handling / retries
    // eslint-disable-next-line no-await-in-loop
    const items = await Promise.all(itemPromises);
    const jobs = items.filter((job) => job.type === 'job');

    if (jobs.length) {
      logger.log('info', `found jobs at batch (${i},${batchEnd})`);
      // eslint-disable-next-line no-await-in-loop
      await JobModel.insertManyJobPostings(jobs);
    }
  }
};
