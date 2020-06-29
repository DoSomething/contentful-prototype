/// <reference types="Cypress" />

import { cloneDeep } from 'lodash';
import { userFactory } from '../fixtures/user';
import { campaignId } from '../fixtures/constants';
import { campaignPath } from '../fixtures/constants';
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

    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: {
        id: campaignId,
        groupTypeId: null,
        groupType: null,
      },
    });

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
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: {
        id: campaignId,
        groupTypeId: null,
        groupType: null,
      },
    });
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

  context('Beta Referral campaign signup', () => {
    /** @test */
    it('Includes the referrer_user_id query param in the signup payload', () => {
      const user = userFactory();

      cy.mockGraphqlOp('CampaignBannerQuery', {
        campaign: {
          id: campaignId,
          groupTypeId: null,
          groupType: null,
        },
      });

      // Visit the campaign landing page:
      cy.withState(exampleCampaign).visit(
        `${campaignPath}${exampleCampaign.campaign.slug}?referrer_user_id=123`,
      );

      // Mock the responses we'll be expecting once we hit the signup button:
      cy.route(`${API}/signups?filter[northstar_id]=${user.id}`, emptyResponse);
      cy.route('POST', `${API}/signups`, newSignup(campaignId, user)).as(
        'signupRequest',
      );

      cy.contains('button', 'Join Us')
        .click()
        .handleLogin(user);

      // The outgoing signup request should include the referrer_user_id.
      cy.wait('@signupRequest')
        .its('request.body.referrer_user_id')
        .should('equal', '123');
    });
  });

  context('Campaign ID configured as referral campaign', () => {
    /** @test */
    it('Displays Referral Page Banner CTA in affirmation for configured campaign', () => {
      const user = userFactory();
      cy.mockGraphqlOp('CampaignBannerQuery', {
        campaign: {
          id: campaignId,
          groupTypeId: null,
          groupType: null,
        },
      });

      // Log in & visit the campaign pitch page:
      cy.authVisitCampaignWithoutSignup(user, exampleReferralCampaign);

      // Mock the response we'll be expecting once we hit "Join Now":
      cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

      // Click "Join Now" & should get the affirmation modal:
      cy.contains('button', 'Join Us').click();
      cy.get('.card.affirmation')
        .findByTestId('cta-referral-page-banner')
        .contains('Benefits With Friends');
    });
  });

  context('Campaign ID not configured as referral campaign', () => {
    /** @test */
    it("Doesn't display Referral Page Banner CTA in affirmation for non configured campaign", () => {
      const user = userFactory();

      cy.mockGraphqlOp('CampaignBannerQuery', {
        campaign: {
          id: campaignId,
          groupTypeId: null,
          groupType: null,
        },
      });

      // Log in & visit the campaign pitch page:
      cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

      // Mock the response we'll be expecting once we hit "Join Now":
      cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

      // Click "Join Now" & should get the affirmation modal:
      cy.contains('button', 'Join Us').click();
      cy.get('.card.affirmation')
        .findByTestId('cta-referral-page-banner')
        .should('not.exist');
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
    cy.findByTestId('campaign-banner-signup-button').should('not.exist');
    cy.get('.card.affirmation').should('not.exist');
  });

  /** @test */
  it('Visits a campaign page from scholarship partner, as an unauthenticated user', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: {
        id: campaignId,
        groupTypeId: null,
        groupType: null,
      },
    });

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
    const user = userFactory();

    cy.mockGraphqlOp('SearchGroupsQuery', {
      groups: [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Philadelphia' },
        { id: 3, name: 'San Francisco' },
      ],
    });

    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: {
        id: campaignId,
        groupTypeId: 1,
        groupType: {
          id: 1,
          filterByState: false,
        },
      },
    });

    // Visit the campaign pitch page
    cy.withState(exampleCampaign).visit('/us/campaigns/test-example-campaign');

    cy.findByTestId('join-group-signup-form').should('have.length', 1);
    cy.findByTestId('campaign-banner-signup-button').contains(
      'button',
      'Join Group',
    );
    cy.findByTestId('join-group-signup-button').should('be.disabled');
    cy.get('#select-group-dropdown').click();
    cy.get('#react-select-select-group--input').type('new');
    cy.get('#react-select-select-group--option-0').click();
    cy.findByTestId('join-group-signup-button').should('be.enabled');

    // Mock the responses we'll be expecting once we hit the signup button:
    cy.route(`${API}/signups?filter[northstar_id]=${user.id}`, emptyResponse);
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user)).as(
      'signupRequest',
    );

    cy.contains('button', 'Join Group')
      .click()
      .handleLogin(user);

    // The outgoing signup request should include the selected group_id.
    cy.wait('@signupRequest')
      .its('request.body.group_id')
      .should('equal', 1);
  });
});
