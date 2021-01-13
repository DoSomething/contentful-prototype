/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('User Account Rewards Tab', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the list of badges', () => {
    const user = userFactory();

    cy.login(user);
    cy.visit(`/us/account/badges`);
    cy.findByTestId('badges-list').should('have.length', 1);
  });

  /** @test */
  it('Opens a badge details modal when a badge is clicked', () => {
    const user = userFactory();

    cy.login(user);
    cy.visit(`/us/account/badges`);

    cy.findByTestId('signup-badge').click();
    cy.findByTestId('badges-modal').should('have.length', 1);
    cy.get('.modal-portal > .wrapper.modal-container').click('topRight');
    cy.findByTestId('badges-modal').should('have.length', 0);
  });

  /** @test */
  it('Displays the correct text for an unearned badge', () => {
    const user = userFactory();

    cy.mockGraphqlOp('SignupsCountQuery', {
      signupsCount: 0,
    });

    cy.login(user);
    cy.visit(`/us/account/badges`);

    cy.findByTestId('signup-badge').click();
    cy.findByTestId('badges-modal').should('have.length', 1);
    cy.findByTestId('unearned-badge-text').should('have.length', 1);
  });

  /** @test */
  it('Displays the correct text for an earned badge', () => {
    const user = userFactory();

    cy.mockGraphqlOp('SignupsCountQuery', {
      signupsCount: 1,
    });

    cy.login(user);
    cy.visit(`/us/account/badges`);

    cy.findByTestId('signup-badge').click();
    cy.findByTestId('badges-modal').should('have.length', 1);
    cy.findByTestId('earned-badge-text').should('have.length', 1);
  });

  /** @test */
  it('Displays the rewards details table', () => {
    const user = userFactory();

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: true }).visit(`/us/account/badges`);
    cy.findByTestId('rewards-info-table').should('have.length', 1);
  });

  /** @test */
  it('Displays the rewards FAQ', () => {
    const user = userFactory();

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: true }).visit(`/us/account/badges`);
    cy.findByTestId('rewards-tab-faq').should('have.length', 1);
  });
});
