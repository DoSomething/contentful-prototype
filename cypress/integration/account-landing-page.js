/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('User Account Landing Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Displays the user name', () => {
    // This user is just for auth purposes
    const user = userFactory();

    cy.mockGraphqlOp('UsernameQuery', {
      user: {
        firstName: 'Puppet',
      },
    });

    // Log in & visit the account page:
    cy.login(user)
      .withFeatureFlags({ account_landing_page: true })
      .visit('/us/account');

    cy.findByTestId('account-landing-page-user-welcome').contains('Puppet');
  });

  it('Displays the navigation links', () => {
    const user = userFactory();

    // Log in & visit the account page:
    cy.login(user)
      .withFeatureFlags({ account_landing_page: true })
      .visit('/us/account');

    cy.findAllByTestId('account-landing-page-navigation-link').should(
      'have.length',
      7,
    );
  });
});
