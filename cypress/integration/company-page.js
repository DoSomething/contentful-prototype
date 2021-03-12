/// <reference types="Cypress" />

import exampleAboutPage from '../fixtures/contentful/exampleAboutPage';

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

  it('Handles Successful Newsletter Cta Submission', () => {
    cy.mockGraphqlOp('CompanyPageQuery', {
      companyPageBySlug: {
        title: 'Easy Scholarships',
        slug: 'easy-scholarships',
      },
    });

    cy.visit(`/us/about/easy-scholarships`);

    cy.intercept(
      'POST',
      'https://identity-dev.dosomething.org/v2/subscriptions',
      {
        statusCode: 200,
        body: { id: '123' },
      },
    );

    cy.get('[data-test="cta-popover-email-form"] input[type="text"]').type(
      'vmack@dosomething.org',
    );
    cy.get('[data-test="cta-popover-email-form"] button').click();

    cy.contains('Thank You For Submitting Your Email');
  });

  it('Handles Failed Submission', () => {
    cy.mockGraphqlOp('CompanyPageQuery', {
      companyPageBySlug: {
        title: 'Easy Scholarships',
        slug: 'easy-scholarships',
      },
    });

    cy.visit(`/us/about/easy-scholarships`);

    cy.intercept(
      'POST',
      'https://identity-dev.dosomething.org/v2/subscriptions',
      {
        statusCode: 422,
        body: {},
      },
    );

    cy.get('[data-test="cta-popover-email-form"] input[type="text"]').type(
      'hsjadcusdcg',
    );
    cy.get('[data-test="cta-popover-email-form"] button').click();

    cy.contains('The email must be a valid email address.');
  });
});
