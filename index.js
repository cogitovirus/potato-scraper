const hnAPI = require('./src/hackerNewsAPI');
const crawler = require('./src/crawler');
const { cleanURL } = require('./src/utils/cleanURL');
const { logger } = require('./src/utils/logger');
require('dotenv').config();

async function main() {
  // limited the posting to 5 just to avoid possible rate limit
  const jobStories = await hnAPI.getJobStories(5);

  const jobDetails = await Promise.all(jobStories.map(async (jobID) => hnAPI.getJobDetails(jobID)));

  let companyURLs = jobDetails.map((jobDetail) => jobDetail.url)
    .filter((url) => url !== undefined)
    .map(cleanURL);

  // remove dupes
  const urlSet = new Set(companyURLs);
  // reassign back to an array
  companyURLs = [...urlSet];

  logger.log('info', `company urls: ${companyURLs}`);
  for (const companyURL of companyURLs) {
    // TODO: use map
    // eslint-disable-next-line no-await-in-loop
    await crawler.crawlCompanyWebsite(companyURL);
  }
}

main().then(() => {
  process.exit(0);
}).catch((err) => {
  process.exitCode = 1;
  throw err;
});
