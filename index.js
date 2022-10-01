// TODO: those imports are just a junkyard for debugging purposes
const hnAPI = require('./src/hackerNewsAPI');
const crawler = require('./src/crawler');
const { cleanURL } = require('./src/utils/cleanURL');
const { logger } = require('./src/utils/logger');
const JobModel = require('./src/db/model/JobModel');
const { syncJobs } = require('./src/syncJobs');

require('dotenv').config();

async function main() {
  // limited the posting to 5 just to avoid possible rate limit
  // const jobStoriesIds = await hnAPI.getJobStories(5);
  // const jobItems = await Promise.all(jobStoriesIds.map(async (jobID) => hnAPI.getItemDetails(jobID)));

  // for (const jobItem of jobItems) {
  //   // eslint-disable-next-line no-await-in-loop
  //   await JobModel.insertJobPosting(jobItem);
  // }

  await syncJobs();

  // ---------------------------

  // let companyURLs = jobDetails.map((jobDetail) => jobDetail.url)
  //   .filter((url) => url !== undefined)
  //   .map(cleanURL);

  // // remove dupes
  // const urlSet = new Set(companyURLs);
  // // reassign back to an array
  // companyURLs = [...urlSet];

  // logger.log('info', `company urls: ${companyURLs}`);
  // for (const companyURL of companyURLs) {
  //   // TODO: use map
  //   // eslint-disable-next-line no-await-in-loop
  //   await crawler.crawlCompanyWebsite(companyURL);
  // }
}

main().then(() => {
  process.exit(0);
}).catch((err) => {
  process.exitCode = 1;
  throw err;
});
