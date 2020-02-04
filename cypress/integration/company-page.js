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

    cy.visit('/us/about/who-we-are');

  });

  it('Renders a Newsletter Cta', () => {
    cy.visit(`/us/about/easy-scholarships`);
    cy.wait(5000);
    cy.contains('PAYS TO DO GOOD');
  });
});

