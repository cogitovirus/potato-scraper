const { URL } = require('node:url');

/**
 * Return just origin from the url
 * @param {string} url
 * @returns {string}
 */
module.exports.cleanURL = (url) => {
  const myURL = new URL(url);
  return myURL.origin;
};
