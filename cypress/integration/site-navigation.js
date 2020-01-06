/// <reference types="Cypress" />

import tailwind from '../../tailwind.config';
import exampleFactPage from '../fixtures/contentful/exampleFactPage';

// Return array of viewport sizes based on Tailwind configuration.
const getViewportSizes = () => {
  const tailwindScreens = tailwind.theme.screens;

  return Object.keys(tailwindScreens).map(key => {
    const screenWidth = Number(tailwindScreens[key].replace('px', ''));

    return { height: 900, width: screenWidth };
  });
};

const sizes = getViewportSizes();

describe('Site Navigation', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  sizes.forEach(size => {
    it(`Search for not found content on ${size.width}px by ${size.height}px viewport`, () => {
      // Set the viewport:
      cy.viewport(size.width, size.height);

      // Go to an example site page:
      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      // Find the search icon in nav and click on it:
      cy.get('#nav .utility-nav__search-icon').click();

      // Assert the search subnav is visible:
      cy.get('.utility-subnav').should('be.visible');

      // Try searching for some content we know will not be found and submit the search form:
      cy.get('#utility-subnav__search input[type="search"]').type('clementine');

      cy.get('#utility-subnav__search').submit();

      // Assert the new page url includes the search query:
      cy.url().should('include', '/search?query=clementine');

      // Assert message received indicates query not found:
      cy.contains("couldn't find what you were looking for");

      // Assert the subnav is not still rendered on search results page:
      cy.get('.utility-subnav').should('not.exist');
    });

    it(`Login and Join Now links are rendered with expected href on ${size.width}px by ${size.height}px viewport`, () => {
      // Set the viewport:
      cy.viewport(size.width, size.height);

      // Go to an example site page:
      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      // Assert the Login link is present and contains correct url in href:
      cy.get('#utility-nav__auth')
        .should('have.attr', 'href')
        .and('include', '/authorize');

      // Assert the Join Now link is present and contains correct url in href:
      cy.get('#utility-nav__join')
        .should('have.attr', 'href')
        .and('include', '/authorize');
    });
  });
});
