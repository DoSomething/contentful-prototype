import url from 'url';
import queryString from 'query-string';

// Custom commands can extend Cypress's behavior, like a
// `cy.login()` convenience method or `element.drag()`.
//
// For more comprehensive examples, see:
// https://on.cypress.io/custom-commands

// Example "parent" command:
Cypress.Commands.add('login', email => {
  Cypress.log({ name: 'Login', message: 'Mocking authentication flow...' });

  cy.get('[data-test="redirect"]', { log: false })
    .invoke('data', 'url')
    .then(redirectUrl => {
      const search = url.parse(redirectUrl).search;
      const query = queryString.parse(search);
      console.log(search, query);

      const actionId = query.actionId;

      cy.on('window:before:load', window => {
        const now = Math.floor(Date.now() / 1000);

        // eslint-disable-next-line no-param-reassign
        window.AUTH = {
          isAuthenticated: true,
          id: '555123fffaaabbbcccddd456',
          expiresAt: now + 3600,
          now,
        };
      });

      // Trigger the
      cy.location({ log: false }).then(location => {
        cy.visit(`${location.pathname}?actionId=${actionId}`, { log: false });
      });
    });
});

// Example "child" command:
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })

// Example "dual" command:
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })

// Example of overriding a built-in command:
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
