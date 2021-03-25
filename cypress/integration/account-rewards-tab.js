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

    cy.mockGraphqlOp('UserBadgeCountQuery', {
      user: {
        badges: [],
      },
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

    cy.mockGraphqlOp('UserBadgeCountQuery', {
      user: {
        id: user.id,
        badges: ['SIGNUP'],
      },
    });

    cy.login(user);
    cy.visit(`/us/account/badges`);

    cy.findByTestId('signup-badge').click();
    cy.findByTestId('badges-modal').should('have.length', 1);
    cy.findByTestId('earned-badge-text').should('have.length', 1);
  });

  /** @test */
  it('Displays the rewards progress bar', () => {
    const user = userFactory();

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: true }).visit(`/us/account/rewards`);
    cy.findByTestId('rewards-progress-bar').should('have.length', 1);
  });

  /** @test */
  it('Displays the rewards progress bar with the right label in the description', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserBadgeCountQuery', {
      user: {
        badges: ['SIGNUP', 'ONE_POST'],
      },
    });

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: true }).visit(`/us/account/rewards`);
    cy.findByTestId('rewards-progress-bar-description').should(
      'contain',
      "You earned 2 out of 6 badges, which makes you a Doer. You're almost there!",
    );
  });

  /** @test */
  it('Displays the rewards progress bar with the right label in the description for users inbetween levels', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserBadgeCountQuery', {
      user: {
        badges: ['SIGNUP', 'ONE_POST', 'ONE_STAFF_FAVE'],
      },
    });

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: true }).visit(`/us/account/rewards`);
    cy.findByTestId('rewards-progress-bar-description').should(
      'contain',
      "You earned 3 out of 6 badges, which makes you a Doer. You're almost there!",
    );
  });

  /** @test */
  it('Displays the rewards details table', () => {
    const user = userFactory();

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: true }).visit(`/us/account/rewards`);
    cy.findByTestId('rewards-info-table').should('have.length', 1);
  });

  /** @test */
  it('Displays the rewards FAQ', () => {
    const user = userFactory();

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: true }).visit(`/us/account/rewards`);
    cy.findByTestId('rewards-tab-faq').should('have.length', 1);
  });

  /** @test */
  it('Hits the correct URL with feature flag set to false', () => {
    const user = userFactory();

    cy.login(user);
    cy.withFeatureFlags({ rewards_levels: false }).visit(`/us/account/badges`);
    cy.findByTestId('rewards-tab-faq').should('have.length', 0);
  });
});
