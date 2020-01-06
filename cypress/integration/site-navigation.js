/// <reference types="Cypress" />

import exampleFactPage from '../fixtures/contentful/exampleFactPage';

const sizes = ['iphone-6', 'iphone-x', 'ipad-2', [1024, 768]];

describe('Site Navigation', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  sizes.forEach(size => {
    it(`Search for not found content on ${size} viewport`, () => {
      // Set the viewport
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      cy.get('#nav .utility-nav__search-icon').click();

      cy.get('.utility-subnav').should('be.visible');

      cy.get('#utility-subnav__search input[type="search"]').type('clementine');

      cy.get('#utility-subnav__search').submit();

      cy.url().should('include', '/search?query=clementine');

      cy.contains("couldn't find what you were looking for");

      cy.get('.utility-subnav').should('not.exist');
    });

    it(`Login and Join Now links are rendered with expected href on ${size} viewport`, () => {
      // Set the viewport
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      cy.get('#utility-nav__auth')
        .should('have.attr', 'href')
        .and('include', '/authorize');

      cy.get('#utility-nav__join')
        .should('have.attr', 'href')
        .and('include', '/authorize');
    });
  });
});
