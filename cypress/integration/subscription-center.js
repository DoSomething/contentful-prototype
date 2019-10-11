/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('Subscription Center', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('View existing subscriptions', () => {
    const user = userFactory();

    // Log in & visit the subscription center:
    cy.login(user).visit('/us/account/profile/subscriptions');

    // have graphQL return 2 subscriptions in particular
    // make sure those are the boxes that are checked
    // cy.mock()
    // look at campaign-gallery.js for GraphQL mocks

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');

    // We shouldn't see the "Join Now" button or affiramation modal,
    // since the user is already signed up for this campaign:
    cy.get('mosaic-lede-banner__signup').should('not.exist');
    cy.get('.card.affirmation').should('not.exist');
  });

  it('Update subscriptions', () => {
    const user = userFactory();

    // Log in & visit the campaign action page:
    cy.login(user)
      .withState(exampleCampaign)
      .withSignup(exampleCampaign.campaign.campaignId)
      .visit('/us/campaigns/test-example-campaign');

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');

    // We shouldn't see the "Join Now" button or affiramation modal,
    // since the user is already signed up for this campaign:
    cy.get('mosaic-lede-banner__signup').should('not.exist');
    cy.get('.card.affirmation').should('not.exist');
  });
});
