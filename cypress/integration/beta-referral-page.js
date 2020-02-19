/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { userId } from '../fixtures/constants';
import { campaignId } from '../fixtures/constants';

describe('Beta Referral Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visit beta referral page, with valid user and campaign ID set', () => {
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

  it('Visit beta referral page, with valid user ID and no campaign ID set', () => {
    const user = userFactory();

    cy.withFeatureFlags({ default_referral_campaign_id: campaignId }).visit(
      `/us/join?user_id=${userId}}`,
    );

    cy.get('.referral-page-campaign').should('have.length', 1);

    cy.get('.referral-page-campaign > a')
      .should('have.attr', 'href')
      .and('include', `referrer_user_id=${userId}`);
  });

  it('Visit beta referral page, without user ID set', () => {
    const user = userFactory();

    cy.withFeatureFlags({ default_referral_campaign_id: campaignId }).visit(
      `/us/join?campaign_id=${campaignId}}`,
    );

    cy.get('.referral-page-campaign').should('have.length', 0);
    cy.get('.error-page').should('have.length', 1);
  });
});
