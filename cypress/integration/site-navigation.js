/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { tailwind } from '../../resources/assets/helpers/display';
import exampleFactPage from '../fixtures/contentful/exampleFactPage';

// Return array of viewport sizes based on Tailwind configuration.
const tailwindScreens = tailwind('screens');

const getViewportSizes = (specifiedSizes = []) => {
  let screenSizes = Object.keys(tailwindScreens);

  if (specifiedSizes.length) {
    screenSizes = screenSizes.filter(size => {
      return specifiedSizes.includes(size);
    });
  }

  return screenSizes.map(size => {
    const screenWidth = Number(tailwindScreens[size].replace('px', ''));

    return { height: 900, width: screenWidth };
  });
};

const allSizes = getViewportSizes();

const smallAndMediumSizes = getViewportSizes(['xs', 'sm', 'md']);

const largeSizes = getViewportSizes(['lg', 'xl', 'xxl']);

describe('Site Navigation', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  allSizes.forEach(size => {
    it(`Open and close the Search subnav on ${size.width}px by ${size.height}px viewport`, () => {
      // Set the viewport:
      cy.viewport(size.width, size.height);

      // Go to an example site page:
      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      // Find the Search icon in nav and click to open it:
      cy.get('#nav .utility-nav__search-icon').click();

      // Assert the Search subnav is visible:
      cy.get('.utility-subnav').should('be.visible');

      // Close the Search subnav:
      cy.get('.btn__close--search-subnav').click();

      // Assert the Search subnav is not still rendered on the page:
      cy.get('.utility-subnav').should('not.exist');
    });

    it(`Search for not found content on ${size.width}px by ${size.height}px viewport`, () => {
      // Set the viewport:
      cy.viewport(size.width, size.height);

      // Go to an example site page:
      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      // Find the Search icon in nav and click to open it:
      cy.get('#nav .utility-nav__search-icon').click();

      // Assert the Search subnav is visible:
      cy.get('.utility-subnav').should('be.visible');

      // Try searching for some content we know will not be found and submit the search form:
      cy.get('#utility-subnav__search input[type="search"]').type('clementine');

      cy.get('#utility-subnav__search').submit();

      // Assert the new page url includes the search query:
      cy.url().should('include', '/search?query=clementine');

      // Assert message received indicates query not found:
      cy.contains("couldn't find what you were looking for");

      // Assert the Search subnav is not still rendered on search results page:
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

  smallAndMediumSizes.forEach(size => {
    it(`Can interact with toggleable main nav items on ${size.width}px by ${size.height}px viewport`, () => {
      // Set the viewport:
      cy.viewport(size.width, size.height);

      // Go to an example site page:
      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      // Find the Causes main nav item and click on it:
      cy.get('#main-nav__causes').click();

      // Assert the Causes subnav is visible:
      cy.get('.main-subnav').should('be.visible');

      // Close the Causes subnav:
      cy.get('.btn__close--main-subnav').click();

      // Assert the Causes subnav is not still rendered on page:
      cy.get('.main-subnav').should('not.exist');

      // Find the Benefits main nav item and click on it:
      cy.get('#main-nav__benefits').click();

      // Assert the Benefits subnav is visible:
      cy.get('.main-subnav')
        .should('be.visible')
        .within(() => {
          cy.findByTestId('benefits-gallery').within(() => {
            cy.findAllByTestId('benefits-card').should('have.length', 3);
          });
        });

      // Close the Benefits subnav:
      cy.get('.btn__close--main-subnav').click();

      // Assert the Benefits subnav is not still rendered on page:
      cy.get('.main-subnav').should('not.exist');
    });

    it('does not render the profile dropdown when hovering over the profile icon or login link', () => {
      const user = userFactory();

      // Set the viewport:
      cy.viewport(size.width, size.height);

      cy.visit('/us/facts/test-11-facts-about-testing');

      cy.findByTestId('login-nav').trigger('mouseover');

      cy.findByTestId('profile-dropdown').should('have.length', 0);

      // Log the user in.
      cy.login(user)
        .withState(exampleFactPage)
        .visit('/us/facts/test-11-facts-about-testing');

      cy.findByTestId('account-profile-nav').trigger('mouseover');

      cy.findByTestId('profile-dropdown').should('have.length', 0);
    });
  });

  largeSizes.forEach(size => {
    it(`Can click main nav items on ${size.width}px by ${size.height}px viewport`, () => {
      // Set the viewport:
      cy.viewport(size.width, size.height);

      // Go to an example site page:
      cy.withState(exampleFactPage).visit(
        '/us/facts/test-11-facts-about-testing',
      );

      // Mouseover the Causes main nav item and assert the subnav is visible:
      cy.get('#main-nav__causes')
        .trigger('mouseover')
        .should('be.visible');

      // Find the Causes main nav item and click on it:
      cy.get('#main-nav__causes')
        .should('have.attr', 'href')
        .and('include', '/campaigns');

      // Mouseover the Benefits main nav item and assert the subnav is visible:
      cy.get('#main-nav__benefits')
        .trigger('mouseover')
        .should('be.visible');

      // Find the Causes main nav item and click on it:
      cy.get('#main-nav__benefits')
        .should('have.attr', 'href')
        .and('include', '/us/about/benefits');
    });

    it('toggles the profile dropdown when hovering over the profile icon', () => {
      const user = userFactory();

      // Set the viewport:
      cy.viewport(size.width, size.height);

      // Log the user in.
      cy.login(user)
        .withState(exampleFactPage)
        .visit('/us/facts/test-11-facts-about-testing');

      cy.findByTestId('account-profile-nav').trigger('mouseover');

      cy.findByTestId('profile-dropdown').within(() => {
        cy.findAllByTestId('profile-dropdown-link').should('have.length', 7);
      });

      cy.findByTestId('account-profile-nav').trigger('mouseout');

      cy.findByTestId('profile-dropdown').should('have.length', 0);
    });

    it.only('toggles the profile dropdown when hovering over the login icon', () => {
      const user = userFactory();

      // Set the viewport:
      cy.viewport(size.width, size.height);

      cy.visit('/us/facts/test-11-facts-about-testing');

      cy.findByTestId('login-nav').trigger('mouseover');

      cy.findByTestId('profile-dropdown').within(() => {
        cy.findAllByTestId('profile-dropdown-link').should('have.length', 8);
      });

      cy.findByTestId('login-nav').trigger('mouseout');

      cy.findByTestId('profile-dropdown').should('have.length', 0);
    });
  });
});
