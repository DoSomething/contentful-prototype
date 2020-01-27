/// <reference types="Cypress" />
const exampleAboutPage = require('../fixtures/contentful/exampleAboutPage');

describe('Company Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  context('Company Pages feature flag turned off', () => {
    it('Renders an about page', () => {
      cy.withState(exampleAboutPage).visit(
        `/us/${exampleAboutPage.page.fields.slug}`,
      );

      cy.contains('.general-page__title', exampleAboutPage.page.fields.title);
      cy.contains(
        '.general-page__subtitle',
        exampleAboutPage.page.fields.subTitle,
      );

      cy.contains('A digital platform powering offline action.');
    });
  });

  context('Company Pages feature flag turned on', () => {
    it('Renders a Company Page', () => {
      cy.withFeatureFlags({ company_pages: true }).visit(
        `/us/about/company-page`,
      );

      cy.contains('h1', 'Hello World');
    });
  });
});
