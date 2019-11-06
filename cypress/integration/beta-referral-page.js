/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { campaignId, userId } from '../fixtures/constants';

describe('Beta Referral Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visit beta referral page, as an anonymous user', () => {
    const user = userFactory();

    // Visit the campaign pitch page:
    cy.visit(`/us/join?user_id=${userId}&campaign_id=${campaignId}`);

    cy.contains('gift card');
  });
});
