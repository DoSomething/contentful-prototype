/// <reference types="Cypress" />

/**
 * Note: For now, We're skipping all of these tests because the Beta Referral Page's server-side
 * Northstar request, which is blocking, and causes these tests to timeout.
 * @see https://github.com/DoSomething/phoenix-next/pull/1932
 */
import { userFactory } from '../fixtures/user';
import { userId } from '../fixtures/constants';
import { campaignId } from '../fixtures/constants';

describe('Beta Referral Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it.skip('Visit beta referral page, with valid user and campaign IDs', () => {
    const user = userFactory();

    cy.withFeatureFlags({ referral_campaign_ids: [campaignId] }).visit(
      `/us/join?user_id=${userId}&campaign_id=${campaignId}`,
      // Allow some extra time to prevent timeouts on initial page load:
      { timeout: 10000 },
    );

    cy.contains('campaign scholarship');
    cy.contains('FAQ');

    cy.get('.referral-page-campaign').should('have.length', 1);

    cy.get('.referral-page-campaign > a')
      .should('have.attr', 'href')
      .and('include', `referrer_user_id=${userId}`);
  });

  it.skip('Visit beta referral page, with invalid user ID', () => {
    const user = userFactory();

    // Our mock user ID won't exist in dev, we can expect a 404.
    cy.visit(`/us/join?user_id=${user.id}}`, { failOnStatusCode: false });

    cy.contains('Not Found');
  });

  it.skip('Visit beta referral page, with missing user ID', () => {
    cy.visit('/us/join', { failOnStatusCode: false });

    // Our mock user ID won't exist in dev, we can expect a 404.
    cy.contains('Not Found');
  });

  it.skip('Visit beta referral page, with valid user ID and no campaign ID', () => {
    const user = userFactory();

    cy.withFeatureFlags({ default_referral_campaign_id: campaignId }).visit(
      `/us/join?user_id=${userId}&campaign_id=${campaignId}`,
    );

    cy.get('.referral-page-campaign').should('have.length', 1);

    cy.get('.referral-page-campaign > a')
      .should('have.attr', 'href')
      .and('include', `referrer_user_id=${userId}`);
  });
});
