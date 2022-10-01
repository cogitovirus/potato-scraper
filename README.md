# potato-scraper
Web & api scraping some basic info about startups from YCombinator. For fun.

## Run
```
node index.js
```

## Getting the data
HN has an API that is generally accessible https://github.com/HackerNews/API.
First step would be to copy only job posting data from the Web API to my own MongoDB.
Each item has a `id` and a `type` field e.g.
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
Syncing will be done in batches and will feed the `HNJobPostings` collection:
1. check the max(id) of the objects in `HNJobPostings` (return 0 if collection is empty)
2. check the max(id) of the objects in HN API https://hacker-news.firebaseio.com/v0/maxitem.json
3. update the range. copy full objects (model may vary? enforce a model or not? )
[TODO] any further update to the collection will run daily with cloud functions & pub/sub

## Enriching the data
With hnJobPosting collections full, not it's time to do some scraping.
For each company axios will enter their website and try to gather some insights on what it does.
For the first take I'll look for metadata tags like title, keywords, description.
[TODO] some tag composition may vary. I'll have to spot check 10+ different examples

Some key points:
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

## EDA


## Mongo
db:
```
const database = 'potato-scraper';
const collection = 'HNJobPostings';
```

## TODO:
- [ ] sync some postings with mongoDB
- [ ] investigate undefined / nulls
- [x] encapsulate web scraping logic / jobSyncing logic
- [x] write a test
- [x] web scraping with https://www.npmjs.com/package/jsdom
- [x] handle empty urls
- [x] strip company url of any additional paths
- [x] fix eslint rules
- [x] fetch job stories
- [x] for each job story get job details
- [x] console.log company url

## Junkyard
look into: 
https://mongoosejs.com/



head
    <title></title>
    <meta name="keywords" content="here">
    <meta name="description" content="here">

https://github.com/HackerNews/API

https://hacker-news.firebaseio.com/v0/jobstories.json
https://hacker-news.firebaseio.com/v0/item/32839972.json

cloud sql + pub/sub run once a day + cloud function ? how much would it cost
https://cloud.google.com/scheduler/docs/tut-pub-sub