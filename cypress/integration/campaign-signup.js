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

/**
 * @param {Number} groupTypeId
 * @param {Boolean} filterByLocation
 * @return {Object}
 */
const mockCampaignBannerQueryResult = (
  groupTypeId,
  filterByLocation = true,
) => {
  return {
    campaign: {
      id: campaignId,
      groupTypeId: groupTypeId || null,
      groupType: groupTypeId
        ? {
            id: groupTypeId,
            filterByLocation,
          }
        : null,
    },
  };
};

const mockSearchGroupsQueryResult = {
  groups: [
    { id: 1, name: 'New York Pizza', location: 'US-NY' },
    { id: 2, name: 'Philadelphia Hoagies', location: 'US-PA' },
    { id: 3, name: 'San Francisco Sourdough', location: 'US-CA' },
  ],
};

exampleReferralCampaign.campaign.displayReferralPage = true;

describe('Campaign Signup', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Create signup, as an anonymous user', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignBannerQuery', mockCampaignBannerQueryResult());

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

    cy.mockGraphqlOp('CampaignBannerQuery', mockCampaignBannerQueryResult());

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

      cy.mockGraphqlOp('CampaignBannerQuery', mockCampaignBannerQueryResult());

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
    describe('Displays Referral Page Banner CTA in affirmation for configured campaign', () => {
      context('Incentive feature flag is toggled on', () => {
        /** @test */
        it('Beta Referral campaign signup displays the beta reward copy', () => {
          const user = userFactory();

          cy.mockGraphqlOp(
            'CampaignBannerQuery',
            mockCampaignBannerQueryResult(),
          );

          // Visit the campaign landing page as an authenticated user with a referrer_user_id query param:
          cy.login(user)
            .withFeatureFlags({
              refer_friends_incentive: true,
            })
            .withState(exampleReferralCampaign)
            .visit(
              `${campaignPath}${exampleCampaign.campaign.slug}?referrer_user_id=${user.id}`,
            );

          // Mock the response we'll be expecting once we hit the signup button:
          cy.route('POST', `${API}/signups`, newSignup(campaignId, user)).as(
            'signupRequest',
          );

          cy.mockGraphqlOp('ReferralUserQuery', {
            user: {
              id: user.id,
              firstName: 'Piano',
            },
          });

          // Click "Join Now" & should get the affirmation modal:
          cy.contains('button', 'Join Us').click();
          cy.get('.card.affirmation')
            .findByTestId('cta-referral-page-banner')
            .contains('You and Piano are both entered to win a $10 gift card!');
        });

        /** @test */
        it('Regular Referral campaign signup displays the general incentive copy', () => {
          const user = userFactory();

          cy.mockGraphqlOp(
            'CampaignBannerQuery',
            mockCampaignBannerQueryResult(),
          );

          // Log in & visit the campaign pitch page:
          cy.withFeatureFlags({
            refer_friends_incentive: true,
          }).authVisitCampaignWithoutSignup(user, exampleReferralCampaign);

          // Mock the response we'll be expecting once we hit "Join Now":
          cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

          // Click "Join Now" & should get the affirmation modal:
          cy.contains('button', 'Join Us').click();
          cy.get('.card.affirmation')
            .findByTestId('cta-referral-page-banner')
            .contains('Benefits With Friends');
        });
      });

      context('Incentive feature flag is toggled off', () => {
        /** @test */
        it('displays the incentive free copy', () => {
          const user = userFactory();

          cy.mockGraphqlOp(
            'CampaignBannerQuery',
            mockCampaignBannerQueryResult(),
          );

          // Log in & visit the campaign pitch page:
          cy.authVisitCampaignWithoutSignup(user, exampleReferralCampaign);

          // Mock the response we'll be expecting once we hit "Join Now":
          cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

          // Click "Join Now" & should get the affirmation modal:
          cy.contains('button', 'Join Us').click();
          cy.get('.card.affirmation')
            .findByTestId('cta-referral-page-banner')
            .contains('Get your Friends Involved!');
        });
      });
    });
  });

  context('Campaign ID not configured as referral campaign', () => {
    /** @test */
    it("Doesn't display Referral Page Banner CTA in affirmation for non configured campaign", () => {
      const user = userFactory();

      cy.mockGraphqlOp('CampaignBannerQuery', mockCampaignBannerQueryResult());

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
    cy.mockGraphqlOp('CampaignBannerQuery', mockCampaignBannerQueryResult());

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
  it('Visits a campaign page from a scholarship partner, as an authenticated user', () => {
    const user = userFactory();

    //Log in and visit the campaign pitch page
    cy.login(user)
      .withState(exampleCampaign)
      .withSignup(exampleCampaign.campaign.campaignId)
      .visit(
        '/us/campaigns/test-example-campaign?utm_campaign=fastweb&utm_source=scholarship',
      );

    //Find the example campaign
    cy.contains('Example Campaign'),
      cy.contains('This is an example campaign for automated testing.'),
      // We shouldn't see the "Apply Now" button,
      // since the user is already signed up for this campaign:
      cy
        .findByTestId('campaign-info-block-scholarship-details')
        .should('not.contain', 'Apply Now');
  });

  context('Campaign ID configured with a group type', () => {
    context('Group type does not filter by location', () => {
      /** @test */
      it('Signup button is enabled after selecting group', () => {
        const user = userFactory();

        cy.mockGraphqlOp('SearchGroupsQuery', mockSearchGroupsQueryResult);

        cy.mockGraphqlOp(
          'CampaignBannerQuery',
          mockCampaignBannerQueryResult(1, false),
        );

        cy.anonVisitCampaign(exampleCampaign);

        cy.findByTestId('join-group-signup-form').should('have.length', 1);
        cy.findByTestId('campaign-banner-signup-button').contains(
          'button',
          'Join Group',
        );
        cy.findByTestId('join-group-signup-button').should('be.disabled');
        cy.get('#select-state-dropdown').should('have.length', 0);
        cy.get('#select-group-dropdown').click();
        cy.get('#react-select-select-group--input').type('new');
        cy.get('#react-select-select-group--option-0').click();
        cy.findByTestId('join-group-signup-button').should('be.enabled');

        // Mock the responses we'll be expecting once we hit the signup button:
        cy.route(
          `${API}/signups?filter[northstar_id]=${user.id}`,
          emptyResponse,
        );
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

    context('Group type filters by location', () => {
      /** @test */
      it('Signup button is enabled after selecting location, then group', () => {
        const user = userFactory();

        cy.mockGraphqlOp('SearchGroupsQuery', mockSearchGroupsQueryResult);
        cy.mockGraphqlOp(
          'CampaignBannerQuery',
          mockCampaignBannerQueryResult(1),
        );

        cy.anonVisitCampaign(exampleCampaign);

        cy.findByTestId('join-group-signup-form').should('have.length', 1);
        cy.findByTestId('campaign-banner-signup-button').contains(
          'button',
          'Join Group',
        );
        cy.findByTestId('join-group-signup-button').should('be.disabled');
        cy.get('#select-state-dropdown').should('have.length', 1);
        cy.get('#select-group-dropdown').should('have.length', 0);
        cy.get('#select-state-dropdown').click();
        cy.get('#react-select-select-state--input').type('new');
        // Select "New York"
        cy.get('#react-select-select-state--option-32').click();
        cy.findByTestId('join-group-signup-button').should('be.disabled');
        cy.get('#select-group-dropdown').should('have.length', 1);
        // Forcing these actions because this element gets covered by the SitewideBanner.
        cy.get('#react-select-select-group--input').type('new', {
          force: true,
        });
        cy.get('#react-select-select-group--option-0').click({ force: true });
        cy.findByTestId('join-group-signup-button').should('be.enabled');

        // Mock the responses we'll be expecting once we hit the signup button:
        cy.route(
          `${API}/signups?filter[northstar_id]=${user.id}`,
          emptyResponse,
        );
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

    context('Group type label configuration', () => {
      /** @test */
      it('Group label is "school" if group type is not in chapter config', () => {
        cy.mockGraphqlOp(
          'CampaignBannerQuery',
          mockCampaignBannerQueryResult(1, false),
        );

        cy.anonVisitCampaign(exampleCampaign);

        cy.contains('start typing your school name');
        cy.contains("Can't find your school?");
      });

      /** @test */
      it('Group label is "chapter" if group type is in chapter config', () => {
        cy.mockGraphqlOp(
          'CampaignBannerQuery',
          mockCampaignBannerQueryResult(20, false),
        );

        cy.withSiteConfig({
          chapter_group_type_ids: '20,22',
        }).anonVisitCampaign(exampleCampaign);

        cy.contains('start typing your chapter name');
        cy.contains("Can't find your chapter?");
      });
    });
  });
});
