/* globals page */

import { handleLogin, setup } from './helpers';

// Our example "signup" test!
describe('Campaign Signup', () => {
  jest.setTimeout(60000);

  const context = setup(page);

  test('should be able to sign up as an anonymous user', async () => {
    const { polly } = context;

    await page.goto('http://phoenix.test/us/campaigns/test-teens-for-jeans');

    // We should see the pitch page:
    const heading = await page.$('.mosaic-lede-banner__headline');
    expect(heading).toMatch("Let's collect another million jeans TOGETHER.");

    // Click the "Join Now" button:
    await expect(page).toClick('button', { text: 'Join Now' });
    await handleLogin(page, { id: '5571f4f5a59dbf3c7a8b4569', role: 'user' });

    await expect(page).toMatch('Thanks for signing up!');
  });
});
