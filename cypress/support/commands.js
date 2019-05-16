// Custom commands can extend Cypress's behavior, like a
// `cy.login()` convenience method or `element.drag()`.
//
// For more comprehensive examples, see:
// https://on.cypress.io/custom-commands

// Example "parent" command:
// Cypress.Commands.add("login", (email, password) => { ... })

// Example "child" command:
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })

// Example "dual" command:
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })

// Example of overriding a built-in command:
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
