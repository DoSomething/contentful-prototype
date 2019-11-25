/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { campaignId } from '../fixtures/constants';
import { exampleCampaign } from '../fixtures/contentful';
import { emptyResponse, newSignup } from '../fixtures/signups';

const API = `/api/v2/campaigns/${campaignId}`;

describe('Hero Template Landing Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Landing Page Loads As Expected', () => {
    cy.mockGraphqlOp('CampaignInfoQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [
          {
            actionLabel: 'Sign a Petition',
            timeCommitmentLabel: '30 minutes - 1 hour',
            scholarshipEntry: true,
            reportback: true,
          },
        ],
      }),
    });

    // Visit the campaign pitch page:
    cy.withState(exampleCampaign).visit('/us/campaigns/test-example-campaign');

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains('Sign a Petition');
    cy.contains('30 minutes - 1 hour');
  });

  it('Landing Page Loads As Expected with no scholarship action', () => {
    cy.mockGraphqlOp('CampaignInfoQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [
          {
            actionLabel: 'Share Something',
            timeCommitmentLabel: '1 hour',
            scholarshipEntry: false,
            reportback: true,
          },
          {
            actionLabel: 'Sign a Petition',
            timeCommitmentLabel: '30 minutes - 1 hour',
            scholarshipEntry: false,
            reportback: true,
          },
        ],
      }),
    });

    // Visit the campaign pitch page:
    cy.withState(exampleCampaign).visit('/us/campaigns/test-example-campaign');

    cy.contains('Example Campaign');
    cy.contains('This is an example campaign for automated testing.');
    cy.contains('Share Something');
    cy.contains('1 hour');
  });

  it('Landing Page Displays a Scholarship Amount if there is one for the campaign', () => {
    cy.mockGraphqlOp('CampaignInfoQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [
          {
            actionLabel: 'Share Something',
            timeCommitmentLabel: '1 hour',
            scholarshipEntry: false,
            reportback: true,
          },
        ],
      }),
    });

    // Visit the campaign pitch page:
    cy.withState(exampleCampaign).visit('/us/campaigns/test-example-campaign');

    cy.contains('Share Something');
    cy.contains('1 hour');
    cy.contains('$5,000');
    cy.contains('Win A Scholarship');
  });

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
