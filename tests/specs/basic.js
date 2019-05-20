const assert = require('assert');

describe('homepage', () => {
  it('should have the right title', () => {
    browser.url('http://phoenix.test');
    const title = browser.getTitle();
    assert.equal(title, "Let's Do This! | DoSomething.org");
  });
});
