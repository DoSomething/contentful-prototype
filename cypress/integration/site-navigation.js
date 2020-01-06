/// <reference types="Cypress" />

import tailwind from '../../tailwind.config';
import exampleFactPage from '../fixtures/contentful/exampleFactPage';

// Return array of viewport sizes based on Tailwind configuration.
const getViewportSizes = () => {
  const tailwindScreens = tailwind.theme.screens;

  return Object.keys(tailwindScreens).map(key => {
    const screenWidth = Number(tailwindScreens[key].replace('px', ''));

    return [screenWidth, 900];
  });
};

const sizes = getViewportSizes();

describe('Site Navigation', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  sizes.forEach(size => {
    it(`Search for not found content on ${size} viewport`, () => {
      // Set the viewport
      cy.viewport(size[0], size[1]);

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
      cy.viewport(size[0], size[1]);

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
