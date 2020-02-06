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

    cy.contains('h1', 'Who We Are');
  });

  it('Renders a Newsletter Cta', () => {
    cy.mockGraphqlOp('CompanyPageQuery', {
      companyPageBySlug: {
        title: 'Easy Scholarships',
        slug: 'easy-scholarships',
      },
    });

    cy.visit(`/us/about/easy-scholarships`);

    cy.contains('Pays To Do Good');
  });

  it('Renders a Newsletter Cta and Successful Input', () => {
    cy.mockGraphqlOp('CompanyPageQuery', {
      companyPageBySlug: {
        title: 'Easy Scholarships',
        slug: 'easy-scholarships',
      },
    });

    cy.visit(`/us/about/easy-scholarships`);

    cy.contains('Pays To Do Good');

    cy.route({
      method: 'POST',
      url: 'https://identity-dev.dosomething.org/v2/subscriptions',
      status: 200,
    });

    cy.get('.email-form__input').type('vmack@dosomething.org');
    cy.get('.email-form__button').click();

    cy.contains('Thank You For Submitting Your Email');
  });

  it('Renders a Newsletter Cta and Unsuccessful Input', () => {
    cy.mockGraphqlOp('CompanyPageQuery', {
      companyPageBySlug: {
        title: 'Easy Scholarships',
        slug: 'easy-scholarships',
      },
    });

    cy.visit(`/us/about/easy-scholarships`);

    cy.contains('Pays To Do Good');

    cy.route({
      method: 'POST',
      url: 'https://identity-dev.dosomething.org/v2/subscriptions',
      status: 422,
    });

    cy.get('.email-form__input').type('hsjadcusdcg');
    cy.get('.email-form__button').click();

    cy.contains('The email must be a valid email address.');
  });
});
