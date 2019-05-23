// Custom commands can extend Cypress's behavior, like a
// `cy.login()` convenience method or `element.drag()`.
//
// For more comprehensive examples, see:
// https://on.cypress.io/custom-commands

import url from 'url';
import qs from 'query-string';

/**
 * Set authentication state for the given user.
 *
 * @param {String} userId
 */
Cypress.Commands.add('login', user => {
  Cypress.log({ name: 'Login', message: 'Mocking authentication flow...' });

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
