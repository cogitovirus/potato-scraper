const { getJobStories, getJobDetails } = require('./lib/hackerNewsAPI');
const { cleanURL } = require('./lib/utils');

async function main() {
  // limited the posting to 5 just to avoid possible rate limit
  const jobStories = await getJobStories(5);

  const jobDetails = await Promise.all(jobStories.map(async (jobID) => getJobDetails(jobID)));

  let companyURLs = jobDetails.map((jobDetail) => jobDetail.url)
    .filter((url) => url !== undefined)
    .map(cleanURL);

  // remove dupes
  const urlSet = new Set(companyURLs);
  // reassign back to array
  companyURLs = [...urlSet];

  console.log(companyURLs);
}

main().then(() => {
  process.exit(0);
}).catch((err) => {
  process.exitCode = 1;
  throw err;
});
