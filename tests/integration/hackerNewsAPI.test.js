const hnAPI = require('../../src/hackerNewsAPI');

describe('Hacker News API', () => {
  it('Should return max item number', async () => {
    const maxItem = await hnAPI.getMaxItemId();
    expect(maxItem).toBeTruthy();
  });
});
