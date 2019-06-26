/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { exampleCampaign } from '../fixtures/contentful';
import { emptyResponse, newSignup } from '../fixtures/signups';

const campaignId = '9002';
const API = `/api/v2/campaigns/${campaignId}`;

describe('Campaign Signup', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Create signup, as an anonymous user', () => {
    const user = userFactory();

    // Visit the campaign pitch page:
    cy.withState(exampleCampaign).visit('/us/campaigns/test-example-campaign');

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');

    // Mock the responses we'll be expecting once we hit "Join Now":
    cy.route(`${API}/signups?filter[northstar_id]=${user.id}`, emptyResponse);
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

    // We should see the affirmation modal after clicking signup button:
    cy.contains('button', 'Join Us')
      .click()
      .handleLogin(user);

    cy.contains('Thanks for joining us!');
  });

  it('Create signup, as an authenticated user', () => {
    const user = userFactory();

    // Log in & visit the campaign pitch page:
    cy.login(user)
      .withState(exampleCampaign)
      .withoutSignup(exampleCampaign.campaign.campaignId)
      .visit('/us/campaigns/test-example-campaign');

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');

    // Mock the response we'll be expecting once we hit "Join Now":
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

    // Click "Join Now" & should get the affirmation modal:
    cy.contains('button', 'Join Us').click();
    cy.get('.card.affirmation').contains('Thanks for joining us!');
  });

  it('Visit with existing signup, as an authenticated user', () => {
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
