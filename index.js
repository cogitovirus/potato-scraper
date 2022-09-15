const jsdom = require('jsdom');
const { getJobStories, getJobDetails } = require('./lib/hackerNewsAPI');
const { cleanURL } = require('./lib/utils');

const { JSDOM } = jsdom;

async function main() {
  // limited the posting to 5 just to avoid possible rate limit
  const jobStories = await getJobStories(10);

  const jobDetails = await Promise.all(jobStories.map(async (jobID) => getJobDetails(jobID)));

  let companyURLs = jobDetails.map((jobDetail) => jobDetail.url)
    .filter((url) => url !== undefined)
    .map(cleanURL);

  // remove dupes
  const urlSet = new Set(companyURLs);
  // reassign back to an array
  companyURLs = [...urlSet];

  console.log(companyURLs);

  const resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false,
  });

  // TODO: use map
  for (const companyURL of companyURLs) {
    console.log(`getting details for: ${companyURL}`);
    // eslint-disable-next-line no-await-in-loop
    const dom = await JSDOM.fromURL(companyURL, { resources: resourceLoader });
    const { head } = dom.window.document;
    const title = head.querySelector('title')?.textContent;
    const keywords = head.querySelector('meta[name="keywords"]')?.getAttribute('content')
    || head.querySelector('meta[property="og:keywords"]')?.getAttribute('content');
    const description = head.querySelector('meta[name="description"]')?.getAttribute('content')
    || head.querySelector('meta[property="og:description"]')?.getAttribute('content');

    console.log(`title: ${title}`);
    console.log(`keywords: ${keywords}`);
    console.log(`description: ${description}`);
    console.log('------------------------');
  }
}

main().then(() => {
  process.exit(0);
}).catch((err) => {
  process.exitCode = 1;
  throw err;
});
