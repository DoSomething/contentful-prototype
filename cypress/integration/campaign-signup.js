/// <reference types="Cypress" />

import { cloneDeep } from 'lodash';
import { userFactory } from '../fixtures/user';
import { campaignId } from '../fixtures/constants';
import { emptyResponse, newSignup } from '../fixtures/signups';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

const API = `/api/v2/campaigns/${campaignId}`;
// Text included in the campaign blurb.
const exampleBlurb = `Did you know that the world's oldest cat`;
const exampleReferralCampaign = cloneDeep(exampleCampaign);

exampleReferralCampaign.campaign.displayReferralPage = true;

describe('Campaign Signup', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Create signup, as an anonymous user', () => {
    const user = userFactory();

    // Visit the campaign pitch page:
    cy.anonVisitCampaign(exampleCampaign);

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains(exampleBlurb);
    cy.get('.pitch-landing-page').should('have.length', 1);

    // Mock the responses we'll be expecting once we hit "Join Now":
    cy.route(`${API}/signups?filter[northstar_id]=${user.id}`, emptyResponse);
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

    // We should see the affirmation modal after clicking signup button:
    cy.contains('button', 'Join Us')
      .click()
      .handleLogin(user);

    cy.contains('Thanks for joining us!');
    cy.get('body').type('{esc}', { force: true });
    cy.get('.card.affirmation').should('not.exist');
  });

  it('Create signup, as an authenticated user', () => {
    const user = userFactory();

    // Log in & visit the campaign pitch page:
    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains(exampleBlurb);
    cy.get('.pitch-landing-page').should('have.length', 1);

    // Mock the response we'll be expecting once we hit "Join Now":
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

    // Click "Join Now" & should get the affirmation modal:
    cy.contains('button', 'Join Us').click();
    cy.get('.card.affirmation').contains('Thanks for joining us!');
    cy.get('.modal-portal > .wrapper.modal-container').click('topRight');
    cy.get('.card.affirmation').should('not.exist');
  });

  context('Campaign ID configured as referral campaign', () => {
    it('Display Referral Page Banner CTA in affirmation for configured campaign & feature flagged user', () => {
      const user = userFactory();

      // Log in & visit the campaign pitch page:
      cy.authVisitCampaignWithoutSignup(user, exampleReferralCampaign);

      // Mock the response we'll be expecting once we hit "Join Now":
      cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

      // Mock the GraphQL response for the user to ensure they have the
      // Refer a Friend feature flag enabled.
      cy.mockGraphqlOp('UserAccountAndSignupsCountQuery', {
        user: {
          hasFeatureFlag: () => true,
        },
      });

      // Click "Join Now" & should get the affirmation modal:
      cy.contains('button', 'Join Us').click();
      cy.get('.card.affirmation').contains('Thanks for joining us!');
      cy.get('.cta-register-banner').contains('Benefits With Friends');
    });
  });

  context('Campaign ID not configured as referral campaign', () => {
    it("Doesn't display Referral Page Banner CTA in affirmation for non configured campaign", () => {
      const user = userFactory();

      // Log in & visit the campaign pitch page:
      cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

      // Mock the response we'll be expecting once we hit "Join Now":
      cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

      // Mock the GraphQL response for the user to ensure they have the
      // Refer a Friend feature flag enabled.
      cy.mockGraphqlOp('UserAccountAndSignupsCountQuery', {
        user: {
          hasFeatureFlag: () => true,
        },
      });

      // Click "Join Now" & should get the affirmation modal:
      cy.contains('button', 'Join Us').click();
      cy.get('.card.affirmation').contains('Thanks for joining us!');
      cy.get('.cta-register-banner').should('not.exist');
    });
  });

  it('Visit with existing signup, as an authenticated user', () => {
    const user = userFactory();

    // Log in & visit the campaign pitch page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains(exampleBlurb);
    cy.get('.pitch-landing-page').should('not.exist');

    // We shouldn't see the "Join Now" button or affiramation modal,
    // since the user is already signed up for this campaign:
    cy.get('mosaic-lede-banner__signup').should('not.exist');
    cy.get('.card.affirmation').should('not.exist');
  });
});
