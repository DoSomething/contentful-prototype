/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('User Account Interests Tab', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('View existing subscriptions', () => {
    // This user is just for auth purposes
    const user = userFactory();

    cy.mockGraphqlOp('CausePreferenceQuery', {
      // Get back a particular user and interests
      user: {
        causes: [
          'ENVIRONMENT',
          'LGBTQ_RIGHTS_EQUALITY',
          'RACIAL_JUSTICE_EQUITY',
        ],
      },
    });

    // Log in & visit the interests tab:
    cy.login(user).visit('/us/account/interests');

    // We should see the user's preferred interests
    cy.findByTestId('environment-interest').should('contain', 'Unfollow');
    cy.findByTestId('lgbtq_rights_equality-interest').should(
      'contain',
      'Unfollow',
    );
    cy.findByTestId('racial_justice_equity-interest').should(
      'contain',
      'Unfollow',
    );
    cy.findByTestId('education-interest').should('contain', 'Follow');
    cy.findByTestId('sexual_harassment_assault-interest').should(
      'contain',
      'Follow',
    );
  });
});
