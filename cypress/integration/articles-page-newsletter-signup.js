/// <reference types="Cypress" />

import faker from 'faker';

describe('Articles Page', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the newsletter signup section', () => {
    cy.mockGraphqlOp('ArticlesPageQuery', {
      page: {
        coverImage: {
          url: faker.image.imageUrl(),
        },
        internalTitle: 'testing title',
        headerTitle: 'Testing',
        headerLinkUrl: 'https://dosomething.org',
      },
    });

    cy.withFeatureFlags({ new_articles_page: true }).visit(`/us/articles`);
    cy.findByTestId('newsletter-section-articles-page').should(
      'have.length',
      1,
    );
  });

  /** @test */
  it('A successful newsletter signup triggers a confirmation display', () => {
    cy.withFeatureFlags({ new_articles_page: true }).visit(`/us/articles`);

    cy.intercept(
      'POST',
      'https://identity-dev.dosomething.org/v2/subscriptions',
      {
        statusCode: 200,
        body: { id: '123' },
      },
    );

    cy.findByTestId('articles-page-email-input').type('lmaher@dosomething.org');
    cy.findByTestId('articles-page-newsletter-signup-button').click();

    cy.contains('Thanks for signing up!');
  });
});
