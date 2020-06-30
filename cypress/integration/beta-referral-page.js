/// <reference types="Cypress" />

import { userId, campaignId } from '../fixtures/constants';

describe('Beta Referral Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visit beta referral page, with valid user and campaign ID set', () => {
    cy.visit(`/us/join?user_id=${userId}&campaign_id=${campaignId}`);

    cy.contains('campaign scholarship');
    cy.contains('FAQ');

    cy.get('.referral-page-campaign').should('have.length', 1);

    cy.get('.referral-page-campaign > a')
      .should('have.attr', 'href')
      .and('include', `referrer_user_id=${userId}`);
  });

  it('Visit beta referral page, with valid user ID and no campaign ID set', () => {
    cy.visit(`/us/join?user_id=${userId}`);

    cy.get('.referral-page-campaign').should('have.length', 0);
    cy.get('.error-page').should('have.length', 1);
  });

  it('Visit beta referral page, without user ID set', () => {
    cy.visit(`/us/join?campaign_id=${campaignId}`);

    cy.get('.referral-page-campaign').should('have.length', 0);
    cy.get('.error-page').should('have.length', 1);
  });

  context('Refer Friends V2', () => {
    it('Displays a secondary referral campaign link', () => {
      cy.withFeatureFlags({ refer_friends_v2: true })
        .withSiteConfig({ default_referral_campaign_id: '9001' })
        .visit(`/us/join?user_id=${userId}&campaign_id=${campaignId}`);

      cy.findByTestId('secondary-campaign-referral-link').within(() => {
        cy.get('a')
          .should('have.attr', 'href')
          .and('include', `referrer_user_id=${userId}`);
      });
    });

    it('Displays only one referral campaign link if the provided campaign ID matches the default', () => {
      cy.withFeatureFlags({ refer_friends_v2: true })
        .withSiteConfig({ default_referral_campaign_id: campaignId })
        .visit(`/us/join?user_id=${userId}&campaign_id=${campaignId}`);

      cy.findByTestId('secondary-campaign-referral-link').should(
        'have.length',
        0,
      );
    });
  });
});
