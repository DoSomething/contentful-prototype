// This example support/index.js is processed and loaded
// automatically before your test files. This is a great
// place to put global configuration and behavior that
// modifies Cypress.
//
// You can read more here:
// https://on.cypress.io/configuration

import './commands';

Cypress.on('window:before:load', window => {
  const document = window.document;

  // Remove built-in 'fetch' support since it cannot yet be mocked by Cypress.
  // eslint-disable-next-line no-param-reassign
  delete window.fetch;

  // Force the application to load a 'fetch' polyfill (bypassing polyfill.io's
  // user-agent detection, which would assume Chrome has support built in).
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://unpkg.com/unfetch/polyfill';
  document.head.appendChild(script);
});
