/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import exampleVoterRegistrationDriveCampaign from '../fixtures/contentful/exampleVoterRegistrationDriveCampaign';

const legacyVoterRegistrationDriveActionPageBlockId =
  exampleVoterRegistrationDriveCampaign.campaign.pages[0].fields.blocks[0].id;

describe('Alpha Voter Registration Drive Page', () => {
  beforeEach(() => cy.configureMocks());

  it('Legacy Alpha OVRD action page blocks display when feature flag disabled', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        id: legacyVoterRegistrationDriveActionPageBlockId,
        __typename: 'ContentBlock',
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('#alpha-voter-registration-drive-page').should('have.length', 0);

    cy.get(
      `[data-contentful-id=${legacyVoterRegistrationDriveActionPageBlockId}]`,
    ).should('have.length', 1);
  });

  it('Legacy Alpha OVRD action page blocks do not display when feature flag enabled', () => {
    const user = userFactory();

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('#alpha-voter-registration-drive-page').should('have.length', 1);

    cy.get(
      `[data-contentful-id=${legacyVoterRegistrationDriveActionPageBlockId}]`,
    ).should('have.length', 0);
  });

  it('Alpha OVRD page displays three empty icons if user has no referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('AlphaVoterRegistrationReferrals', {
      posts: [],
    });

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('.referral-list-item-completed').should('have.length', 0);
    cy.get('#additional-referrals-count').should('have.length', 0);
  });

  it('Alpha OVRD page displays 2 completed icons if user has 2 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('AlphaVoterRegistrationReferrals', {
      posts: [
        {
          id: 2,
          user: {
            displayName: 'Jesus Q.',
          },
        },
        {
          id: 3,
          user: {
            displayName: 'Walter S.',
          },
        },
      ],
    });

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('.referral-list-item-completed').should('have.length', 2);
    cy.nth('.referral-list-item-completed', 0).within(() => {
      cy.get('.referral-list-item-label').contains('Jesus Q.');
    });
    cy.nth('.referral-list-item-completed', 1).within(() => {
      cy.get('.referral-list-item-label').contains('Walter S.');
    });
    cy.get('.referral-list-item-empty').should('have.length', 1);
    cy.get('#additional-referrals-count').should('have.length', 0);
  });
});
