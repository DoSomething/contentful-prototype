/// <reference types="Cypress" />

describe('Show Submission Page', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the post image and a gallery block for the recommended campaigns', () => {
    cy.withFeatureFlags({ post_confirmation_page: true }).visit('/us/posts/1');

    cy.findByTestId('post-submission-image').should('have.length', 1);
    cy.findByTestId('gallery-block').should('have.length', 1);
  });
});
