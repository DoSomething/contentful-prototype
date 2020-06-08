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

  /** @test */
  it('Create signup, as an anonymous user', () => {
    const user = userFactory();

    // Visit the campaign landing page:
    cy.anonVisitCampaign(exampleCampaign);

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains(exampleBlurb);
    cy.findByTestId('campaign-info-block-container').should('have.length', 1);
    cy.findByTestId('landing-page-content').should('have.length', 1);

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

  /** @test */
  it('Create signup, as an authenticated user', () => {
    const user = userFactory();

    // Log in & visit the campaign landing page:
    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains(exampleBlurb);
    cy.findByTestId('campaign-info-block-container').should('have.length', 1);
    cy.findByTestId('landing-page-content').should('have.length', 1);
    cy.findByTestId('join-group-signup-form').should('not.exist');

    // Mock the response we'll be expecting once we hit "Join Now":
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

    // Click "Join Now" & should get the affirmation modal:
    cy.contains('button', 'Join Us').click();
    cy.get('.card.affirmation').contains('Thanks for joining us!');
    cy.get('.modal-portal > .wrapper.modal-container').click('topRight');
    cy.get('.card.affirmation').should('not.exist');
  });

  context('Campaign ID configured as referral campaign', () => {
    /** @test */
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
    /** @test */
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

  /** @test */
  it('Visit with existing signup, as an authenticated user', () => {
    const user = userFactory();

    // Log in & visit the campaign landing page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains(exampleBlurb);
    cy.findByTestId('campaign-info-block-container').should('have.length', 1);
    cy.findByTestId('landing-page-content').should('not.exist');

    // We shouldn't see the "Join Now" button or affirmation modal,
    // since the user is already signed up for this campaign:
    cy.findByTestId('campaign-banner-signup-form').should('not.exist');
    cy.get('.card.affirmation').should('not.exist');
  });

  /** @test */
  it('Visits a campaign page from scholarship partner, as an unauthenticated user', () => {
    // Visit the campaign pitch page
    cy.withState(exampleCampaign).visit(
      '/us/campaigns/test-example-campaign?utm_campaign=fastweb&utm_source=scholarship',
    );

    // We should see the Apply Now button in the modal
    cy.findByTestId('campaign-info-block-scholarship-details').contains(
      'button',
      'Apply Now',
    );
  });

  /** @test */
  it('Visits a groups campaign page, as an unauthenticated user', () => {
    cy.mockGraphqlOp('SearchGroupsQuery', {
      groups: [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Philadelphia' },
        { id: 3, name: 'San Francisco' },
      ],
    });

    // Visit the campaign pitch page
    cy.withState(exampleCampaign).visit(
      '/us/campaigns/test-example-campaign?group_type_id=1',
    );

    cy.findByTestId('join-group-signup-form').should('have.length', 1);
    cy.findByTestId('campaign-banner-signup-form').contains(
      'button',
      'Join Group',
    );
    cy.findByTestId('join-group-signup-button').should('be.disabled');
    cy.get('#select-group-dropdown').click();
    cy.get('#react-select-select-group--option-0').click();
    cy.findByTestId('join-group-signup-button').should('be.enabled');
  });
});
