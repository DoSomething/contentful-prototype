/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { campaignId, userId } from '../fixtures/constants';

describe('Beta Referral Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visit beta referral page with valid user and campaign IDs', () => {
    const user = userFactory();

    cy.visit(`/us/join?user_id=${userId}&campaign_id=${campaignId}`);

    cy.contains('gift card');
  });

  it('Visit beta referral page with invalid user ID query', () => {
    const user = userFactory();

    // Our mock user ID won't exist in dev, we can expect a 404.
    cy.visit(`/us/join?user_id=${user.id}}`, { failOnStatusCode: false });

    cy.contains('Not Found');
  });

  it('Visit beta referral page with missing user query var', () => {
    cy.visit('/us/join', { failOnStatusCode: false });

    // Our mock user ID won't exist in dev, we can expect a 404.
    cy.contains('Not Found');
  });
});
