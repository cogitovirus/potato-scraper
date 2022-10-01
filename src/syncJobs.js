const JobModel = require('./db/model/JobModel');
const hnAPI = require('./hackerNewsAPI');
const { logger } = require('./utils/logger');

/**
 * TODO: add a doc
 */
module.exports.syncJobs = async () => {
  const mongoMaxItemId = await JobModel.getMaxItemId();
  const hnMaxItemId = await hnAPI.getMaxItemId();

  logger.log('info', `running sync job. mongo itemMaxID: ${mongoMaxItemId}, hacker news max: ${hnMaxItemId}`);

  for (let i = mongoMaxItemId + 1; i < hnMaxItemId; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const nextItem = await hnAPI.getItem(i);
    if (nextItem.type === 'job') {
      logger.log('info', `found job at id: ${nextItem.id}`);
      // eslint-disable-next-line no-await-in-loop
      await JobModel.insertJobPosting(nextItem);
    }
  }
};
