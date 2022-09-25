# potato-scraper
Web & api scraping some basic info about startups from YCombinator. For fun.

## Getting the data


## Mongo
db:
```
const database = 'potato-scraper';
const collection = 'hnJobPostings';
```

## TODO:
- [ ] write a test
- [ ] investigate undefined / nulls
- [ ] encapsulate web scraping logic
- [ ] save results to a DB (local first , then google cloud)
- [x] web scraping with https://www.npmjs.com/package/jsdom
- [x] handle empty urls
- [x] strip company url of any additional paths
- [x] fix eslint rules
- [x] fetch job stories
- [x] for each job story get job details
- [x] console.log company url

## Junkyard

head
    <title></title>
    <meta name="keywords" content="here">
    <meta name="description" content="here">

https://github.com/HackerNews/API

https://hacker-news.firebaseio.com/v0/jobstories.json
https://hacker-news.firebaseio.com/v0/item/32839972.json

Max item:
https://hacker-news.firebaseio.com/v0/maxitem.json


cloud sql + pub/sub run once a day + cloud function ? how much would it cost
https://cloud.google.com/scheduler/docs/tut-pub-sub