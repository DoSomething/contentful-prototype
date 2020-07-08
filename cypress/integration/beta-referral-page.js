/// <reference types="Cypress" />

import {
  userId,
  campaignId,
  defaultReferralCampaignId,
} from '../fixtures/constants';

describe('Beta Referral Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visit beta referral page, with valid user and campaign ID set', () => {
    cy.visit(`/us/join?user_id=${userId}&campaign_id=${campaignId}`);

    cy.contains('Your friend');
    cy.contains('FAQ');

    cy.get('.referral-page-campaign').should('have.length', 2);

    cy.get('.referral-page-campaign > a')
      .should('have.attr', 'href')
      .and('include', `referrer_user_id=${userId}`);

    cy.findByTestId('secondary-campaign-referral-link').should(
      'have.length',
      1,
    );
  });

  it('Visit beta referral page, without user ID set', () => {
    cy.visit(`/us/join?campaign_id=${campaignId}`);

    cy.get('.referral-page-campaign').should('have.length', 0);
    cy.get('.error-page').should('have.length', 1);
  });

  it('Displays only one referral campaign link if the provided campaign ID matches the default', () => {
    cy.visit(
      `/us/join?user_id=${userId}&campaign_id=${defaultReferralCampaignId}`,
    );

    cy.get('.referral-page-campaign').should('have.length', 1);

    cy.findByTestId('secondary-campaign-referral-link').should(
      'have.length',
      0,
    );
  });

  describe('Visit beta referral page, with valid user ID and no campaign ID set', () => {
    context('With no default campaign configured', () => {
      it('Displays an error', () => {
        cy.withSiteConfig({ default_referral_campaign_id: undefined }).visit(
          `/us/join?user_id=${userId}`,
        );

        cy.get('.referral-page-campaign').should('have.length', 0);
        cy.get('.error-page').should('have.length', 1);
      });
    });

    context('With a default campaign configured', () => {
      it('Displays the default campaign', () => {
        cy.visit(`/us/join?user_id=${userId}`);

        cy.get('.referral-page-campaign').should('have.length', 1);

        cy.findByTestId('secondary-campaign-referral-link').should(
          'have.length',
          0,
        );
      });
    });
  });
});
