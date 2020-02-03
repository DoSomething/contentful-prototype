/// <reference types="Cypress" />
const exampleAboutPage = require('../fixtures/contentful/exampleAboutPage');

describe('Company Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Renders a Company Page', () => {
    cy.visit(`/us/${exampleAboutPage.page.fields.slug}`);

    cy.mockGraphqlOp('CompanyPageQuery', {
      companyPageBySlug: {
        title: 'Who We Are',
        slug: 'about/who-we-are',
      },
    });

    cy.withFeatureFlags({ company_pages: true });
    cy.visit('/us/about/who-we-are');

    cy.contains('h1', 'Who We Are');
  });
});
