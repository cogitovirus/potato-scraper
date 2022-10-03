# potato-scraper
Weekend side project with a goal of web scraping information about companies that have/had job postings on hacker news.
End goal is to analyze what problems startups are tacking right now.

## Collecting the data
After doing some research on [hacker news](https://news.ycombinator.com/) I've found out that they have a [public web API](https://github.com/HackerNews/API) and decided to use it. **That was a huge mistake.** this Web API is pretty simple, it does not have specific endpoints to only filter job postings, so in order to gather my dataset I would have to crawl all 33M+ records. Only after creating the basic scraping implementation (`src/syncJobs.js`) I've realized that if I wanted to be kind, and fire 5 requests at a time to not trigger any 429 errors it would still take me ~76 days to process all the records.

### Alternative aproach
Based on this finding I realized I had plenty of time to do more research. And then I've found [this](https://console.cloud.google.com/marketplace/details/y-combinator/hacker-news). Google Cloud hosts full Hacker News board database in it's public dataset repository 🤦‍♂️.

Getting the data I wanted, ended up being as simple as:
```
CREATE TABLE `cogitovirus.hn_jobs.jobs` AS (
  SELECT
   *
  FROM
    `bigquery-public-data.hacker_news.full`
  WHERE
    type = 'job'
);
```
It ran whole 12s. Generated table with 15744 job recors, that was exported to a csv file.

## Exploratory data analysis
TODO
Notebook that contains the EDA is here `notebooks/hn_jobs_eda.ipynb`

## Data wrangling
TODO

## Enriching the data set - back to web scraping
With hnJobPosting collections full, not it's time to do some scraping.
For each company axios will enter their website and try to gather some insights on what it does.
For the first take I'll look for metadata tags like title, keywords, description.
[TODO] some tag composition may vary. I'll have to spot check 10+ different examples

[TODO] key points:
- have a seperate collection: `companiesData`
- `HNJobPostings` will have many to one relationship with `companiesData`
- company will have a job array with id's of companies it links to
- lastUpdated - timestamp of the last time it was web scraped

[TODO] got to figure out a way to have well structured data for EDA. For example:
I'm primarly intereseted in:
- overview - what it does, high level
- industry
- keywords/specialties
- company size / founded / headquaters - not really

------------------------
## Work notes

### Run
```
node index.js
```
or
```
npm run start
```
## TODO:
- [ ] Web Scraping approach
- [ ] EDA for the jobs dataset
- [ ] investigate undefined / nulls in web scraping logic
- [x] encapsulate web scraping logic / jobSyncing logic
- [x] write a test

## Junkyard

head
```
    <title></title>
    <meta name="keywords" content="here">
    <meta name="description" content="here">
```


https://hacker-news.firebaseio.com/v0/jobstories.json
https://hacker-news.firebaseio.com/v0/item/32839972.json


Example structure of an item:
```
{
"by": "cstanley",
"id": 32839972,
"score": 1,
"time": 1663174803,
"title": "Patterns (YC S21) Is hiring devs to help us build the Figma for data",
"type": "job",
"url": "https://patterns.app/"
}
```