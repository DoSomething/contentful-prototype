/// <reference types="Cypress" />

import { exampleFactPage } from '../fixtures/contentful';

describe('Pages', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Renders a simple 11 Facts page', () => {
    cy.withState(exampleFactPage).visit(
      '/us/facts/test-11-facts-about-testing',
    );

    // Ensure the page has successfully parsed Markdown & rendered:
    cy.contains('h1', '11 Facts About Testing');
    cy.contains(
      'Cypress is an open-source JavaScript test runner. Cypress takes snapshots as your tests run.',
    );

    // The footnotes should have been processed and placed below the content:
    cy.contains(
      '.footnotes',
      'Cypress.io. "Open Source JavaScript Test Runner." Web Accessed June, 27 2019.',
    );
  });
});
