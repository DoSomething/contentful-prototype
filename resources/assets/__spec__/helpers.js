/* globals window page document */

import url from 'url';
import path from 'path';
import qs from 'query-string';
import { Polly } from '@pollyjs/core';
import { setupPolly } from 'setup-polly-jest';
import FSPersister from '@pollyjs/persister-fs';
import PuppeteerAdapter from '@pollyjs/adapter-puppeteer';

// Register the Puppeteer adapter for browser tests.
Polly.register(PuppeteerAdapter);
Polly.register(FSPersister);

/**
 * Set authentication state for the given user.
 *
 * @param {Object} user
 */
export const login = (page, user) => {
  page.evaluate(() => (window.Puppeteer = true)); // TODO: This should be a 'load' event.
  page.evaluate(({ id, role }) => {
    const now = Math.floor(Date.now() / 1000);
    window.AUTH = {
      isAuthenticated: true,
      id,
      role,
      expiresAt: now + 3600,
      now,
    };
  }, user);
};

/**
 * Handle an authentication redirect & log in as the given user.
 *
 * @param {object} user
 */
export const handleLogin = async (page, user) => {
  await expect(page).toMatchElement('[data-test="redirect"]');

  // TODO: How would we make re-usable `handleLogin` and `login` helpers?
  const redirectUrl = await page.evaluate(() =>
    document.querySelector('[data-test="redirect"]').getAttribute('data-url'),
  );
  const { search } = url.parse(redirectUrl);
  const { actionId } = qs.parse(search);

  const { protocol, host, pathname } = url.parse(page.url());
  await page.goto(`${protocol}//${host}${pathname}?actionId=${actionId}`);

  login(page, user);
};

/**
 * Configure the page & HTTP mocks.
 */
export const setup = async page => {
  // Tell application that we're running tests (so we can swap
  // out behavior we want to mock, like authentication):
  page.on('domcontentloaded', () =>
    page.evaluate(() => {
      window.Puppeteer = true;
    }),
  );

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

  // Allow Polly to control the browser's network requests.
  await page.setRequestInterception(true);

  return context;
};
