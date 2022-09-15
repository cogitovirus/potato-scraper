const axios = require('axios');

const hackerNewsAPI = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com',
});

const getJobStories = async (limit) => {
  const response = await hackerNewsAPI.get('/v0/jobstories.json');
  return response.data.slice(0, limit);
};

const getJobDetails = async (jobID) => {
  let response;
  try {
    response = await hackerNewsAPI.get(`/v0/item/${jobID}.json`);
    return response.data;
  } catch (err) {
    console.log(`${jobID} call finished with an error:\n${err}\nskipping`);
  }
};

async function main() {
  // limited the posting to 5 just to avoid possible rate limit
  const jobStories = await getJobStories(5);

  const jobDetails = await Promise.all(jobStories.map(async (jobID) => getJobDetails(jobID)));

  jobDetails.forEach((jobPosting) => console.log(jobPosting.url));
}

main().then(() => { console.log('done'); });
