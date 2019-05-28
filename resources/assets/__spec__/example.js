/* globals page */

import path from 'path';
import { Polly } from '@pollyjs/core';
import { setupPolly } from 'setup-polly-jest';
import FSPersister from '@pollyjs/persister-fs';
import PuppeteerAdapter from '@pollyjs/adapter-puppeteer';

// Register the Puppeteer adapter for browser tests.
Polly.register(PuppeteerAdapter);
Polly.register(FSPersister);

describe('example', () => {
  const context = setupPolly({
    adapters: ['puppeteer'],
    adapterOptions: { puppeteer: { page } },
    persister: 'fs',
    recordIfMissing: true,
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, '../__recordings__'),
      },
    },
  });

  test('should be able to sign up', async () => {
    jest.setTimeout(60000);

    const { server } = context.polly;

    await page.setRequestInterception(true);
    await page.goto('http://phoenix.test/us/campaigns/test-teens-for-jeans');

    // Tell application that we're running tests:
    page.evaluate(() => (window.Puppeteer = true));

    const heading = await page.$('.mosaic-lede-banner__headline');
    expect(heading).toMatch("Let's collect another million jeans TOGETHER.");
  });
});
