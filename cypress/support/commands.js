// Custom commands can extend Cypress's behavior, like a
// `cy.login()` convenience method or `element.drag()`.
//
// For more comprehensive examples, see:
// https://on.cypress.io/custom-commands

import url from 'url';
import qs from 'query-string';

import schema from '../../schema.json';
import mocks from '../fixtures/graphql';
import { existingSignup, emptyResponse } from '../fixtures/signups';

// Register Cypress plugins:
import 'cypress-graphql-mock';
import 'cypress-file-upload';

/**
 * Configure fresh mocks for this test case.
 */
Cypress.Commands.add('configureMocks', () => {
  // Configure Cypress's XHR mock server.
  // <https://docs.cypress.io/guides/guides/network-requests.html>
  cy.server();

  // Configure in-memory GraphQL mock server, based on a snapshot of our
  // schema & some custom mock resolvers. <https://git.io/fjwO3>
  cy.mockGraphql({ schema, mocks });
});

/**
 * Set authentication state for the given user.
 *
 * @param {String} userId
 */
Cypress.Commands.add('login', function(user) {
  Cypress.log({ name: 'Login', message: 'Mocking authentication flow...' });

  // Store user context for later...
  this.user = user;

  cy.on('window:before:load', window => {
    const now = Math.floor(Date.now() / 1000);

    // eslint-disable-next-line no-param-reassign
    window.AUTH = {
      isAuthenticated: true,
      id: user.id,
      role: user.role,
      expiresAt: now + 3600,
      now,
    };
  });
});

/**
 * Handle an authentication redirect & log in as the given user.
 *
 * @param {String} userId
 */
Cypress.Commands.add('handleLogin', user => {
  Cypress.log({ name: 'Gate', message: 'Capturing login redirect...' });

  cy.get('[data-test="redirect"]', { log: false })
    .then(el => el.data('url'))
    .then(redirectUrl => {
      const { search } = url.parse(redirectUrl);
      const { actionId } = qs.parse(search);

      cy.login(user);

      // Trigger any queued Redux actions:
      cy.location({ log: false }).then(location => {
        cy.visit(`${location.pathname}?actionId=${actionId}`, { log: false });
      });
    });
});

/**
 * Set application state.
 *
 * @param {Object} state
 */
Cypress.Commands.add('withState', state => {
  cy.on('window:before:load', window => {
    // eslint-disable-next-line no-param-reassign
    window.STATE = state;
  });
});

/**
 * Mock an existing signup for the logged-in user & given campaign.
 *
 * @param {Object} state
 */
Cypress.Commands.add('withSignup', function(campaignId) {
  if (!this.user) {
    throw new Error("The 'withSignup' helper requires a logged-in user.");
  }

  // Mock the "existing" signup response for this campaign:
  const SIGNUP_API = `/api/v2/campaigns/${campaignId}/signups`;
  const response = existingSignup(campaignId, this.user);
  cy.route(`${SIGNUP_API}?filter[northstar_id]=${this.user.id}`, response);
});

/**
 * Mock a missing signup for the logged-in user & given campaign.
 *
 * @param {Object} state
 */
Cypress.Commands.add('withoutSignup', function(campaignId) {
  if (!this.user) {
    throw new Error("The 'withoutSignup' helper requires a logged-in user.");
  }

  // Mock an "empty" signup response for this campaign:
  const SIGNUP_API = `/api/v2/campaigns/${campaignId}/signups`;
  cy.route(`${SIGNUP_API}?filter[northstar_id]=${this.user.id}`, emptyResponse);
});
