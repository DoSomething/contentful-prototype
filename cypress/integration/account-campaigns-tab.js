/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('User Account Campaigns Tab', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays default text if a user has not posted a reportback', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('empty-state-block').should('have.length', 1);
  });
});
