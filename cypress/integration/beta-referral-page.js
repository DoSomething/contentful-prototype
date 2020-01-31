/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { userId } from '../fixtures/constants';
import { campaignId } from '../fixtures/constants';

describe('Beta Referral Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());
  const referralFeatureFlags = {
    referral_campaign_ids: [campaignId],
    default_referral_campaign_id: campaignId,
  };

  it('Visit beta referral page, with valid user and campaign IDs', () => {
    const user = userFactory();

    cy.withFeatureFlags(referralFeatureFlags).visit(
      `/us/join?user_id=${userId}?campaign_id=${campaignId}`,
    );

    cy.contains('campaign scholarship');
    cy.contains('FAQ');

    cy.get('.referral-page-campaign').should('have.length', 1);

    cy.get('.referral-page-campaign > a')
      .should('have.attr', 'href')
      .and('include', `referrer_user_id=${userId}`);
  });

  it('Visit beta referral page, with invalid user ID', () => {
    const user = userFactory();

    // Our mock user ID won't exist in dev, we can expect a 404.
    cy.visit(`/us/join?user_id=${user.id}}`, { failOnStatusCode: false });

    cy.contains('Not Found');
  });

  it('Visit beta referral page, with missing user ID', () => {
    cy.visit('/us/join', { failOnStatusCode: false });

    // Our mock user ID won't exist in dev, we can expect a 404.
    cy.contains('Not Found');
  });

  it('Visit beta referral page, with valid user ID and no campaign ID', () => {
    const user = userFactory();

    cy.withFeatureFlags(referralFeatureFlags).visit(
      `/us/join?user_id=${userId}&campaign_id=${campaignId}`,
    );

    cy.get('.referral-page-campaign').should('have.length', 1);

    cy.get('.referral-page-campaign > a')
      .should('have.attr', 'href')
      .and('include', `referrer_user_id=${userId}`);
  });
});
