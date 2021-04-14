/// <reference types="Cypress" />

describe('Articles Page', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the newsletter signup section', () => {
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

  /** @test */
  it('Handles a failed submission', () => {
    cy.withFeatureFlags({ new_articles_page: true }).visit(`/us/articles`);

    cy.intercept(
      'POST',
      'https://identity-dev.dosomething.org/v2/subscriptions',
      {
        statusCode: 422,
        body: {
          error: {
            message: 'Failed validation.',
            fields: {
              email: ['The email must be a valid email address.'],
            },
          },
        },
      },
    );

    cy.findByTestId('articles-page-email-input').type('dskafjhdakj');
    cy.findByTestId('articles-page-newsletter-signup-button').click();

    cy.should('not.contain', 'Thanks for signing up!');
  });
});
