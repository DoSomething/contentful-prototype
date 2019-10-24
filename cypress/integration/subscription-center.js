/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('Subscription Center', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('View existing subscriptions', () => {
    // This user is just for auth purposes
    const user = userFactory();

    cy.mockGraphqlOp('AccountQuery', {
      // Get back a particular user and subscription topics
      user: root => ({
        firstName: 'Delilah',
        emailSubscriptionTopics: ['COMMUNITY', 'NEWS', 'LIFESTYLE'],
      }),
    });

    // Log in & visit the subscription center:
    cy.login(user).visit('/us/account/profile/subscriptions');

    // We should see the user's name and the correct subscription topics checked
    cy.contains('Welcome, Delilah!');
    cy.get('input[name=COMMUNITY]').should('be.checked');
    cy.get('input[name=NEWS]').should('be.checked');
    cy.get('input[name=LIFESTYLE]').should('be.checked');
    cy.get('input[name=SCHOLARSHIPS]').should('not.be.checked');
  });
});
