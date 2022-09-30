const jsdom = require('jsdom');
const { logger } = require('./utils/logger');

const { JSDOM } = jsdom;

module.exports.crawlCompanyWebsite = async (companyURL) => {
  const resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false,
  });

  logger.log('info', `getting details for: ${companyURL}`);
  // eslint-disable-next-line no-await-in-loop
  const dom = await JSDOM.fromURL(companyURL, { resources: resourceLoader });
  const { head } = dom.window.document;
  const title = head.querySelector('title')?.textContent;
  const keywords = head.querySelector('meta[name="keywords"]')?.getAttribute('content')
    || head.querySelector('meta[property="og:keywords"]')?.getAttribute('content');
  const description = head.querySelector('meta[name="description"]')?.getAttribute('content')
    || head.querySelector('meta[property="og:description"]')?.getAttribute('content');

  logger.log('info', `title: ${title}`);
  logger.log('info', `keywords: ${keywords}`);
  logger.log('info', `description: ${description}`);
  logger.log('info', '------------------------');
};
