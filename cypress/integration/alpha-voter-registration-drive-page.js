/// <reference types="Cypress" />

import faker from 'faker';
import { userFactory } from '../fixtures/user';
import exampleVoterRegistrationDriveCampaign from '../fixtures/contentful/exampleVoterRegistrationDriveCampaign';

const legacyVoterRegistrationDriveActionPageBlockId =
  exampleVoterRegistrationDriveCampaign.campaign.pages[0].fields.blocks[0].id;

/**
 * @param String displayName
 * @return Object
 */
function fakePost(displayName) {
  return {
    id: faker.random.number(),
    user: { displayName },
  };
}

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

    cy.get('[data-test=alpha-voter-registration-drive-page]').should(
      'have.length',
      0,
    );
    cy.get('[data-test=total-accepted-quantity]').should('have.length', 0);
    cy.get(
      `[data-contentful-id=${legacyVoterRegistrationDriveActionPageBlockId}]`,
    ).should('have.length', 1);
  });

  it('Legacy Alpha OVRD action page blocks do not display when feature flag enabled', () => {
    const user = userFactory();

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=alpha-voter-registration-drive-page]').should(
      'have.length',
      1,
    );
    cy.get('[data-test=total-accepted-quantity]').should('have.length', 1);
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

    cy.get('[data-test=referral-list-item-empty]').should('have.length', 3);
    cy.get('[data-test=referral-list-item-completed]').should('have.length', 0);
    cy.get('[data-test=additional-referrals-count]').should('have.length', 0);
  });

  it('Alpha OVRD page displays 2 completed icons if user has 2 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('AlphaVoterRegistrationReferrals', {
      posts: [fakePost('Jesus Q.'), fakePost('Walter S.')],
    });

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=referral-list-item-completed]').should('have.length', 2);
    cy.nth('[data-test=referral-list-item-completed]', 0).within(() => {
      cy.get('.figure__body').contains('Jesus Q.');
    });
    cy.nth('[data-test=referral-list-item-completed]', 1).within(() => {
      cy.get('.figure__body').contains('Walter S.');
    });
    cy.get('[data-test=referral-list-item-empty]').should('have.length', 1);
    cy.get('[data-test=additional-referrals-count]').should('have.length', 0);
  });

  it('Alpha OVRD page displays 3 completed icons and additional count if user has 5 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('AlphaVoterRegistrationReferrals', {
      posts: [
        fakePost('Sarah C.'),
        fakePost('Kyle R.'),
        fakePost('John C.'),
        fakePost('Miles D.'),
        fakePost('Tarissa D.'),
      ],
    });

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=referral-list-item-completed]').should('have.length', 3);
    cy.nth('[data-test=referral-list-item-completed]', 0).within(() => {
      cy.get('p').contains('Sarah C.');
    });
    cy.nth('[data-test=referral-list-item-completed]', 1).within(() => {
      cy.get('.figure__body').contains('Kyle R.');
    });
    cy.nth('[data-test=referral-list-item-completed]', 2).within(() => {
      cy.get('.figure__body').contains('John C.');
    });
    cy.get('[data-test=referral-list-item-empty]').should('have.length', 0);
    cy.get('[data-test=additional-referrals-count]').contains('+ 2 more');
  });

  it('Renders sum of quantity if approved posts query returns results', () => {
    const user = userFactory();
    const actionId = faker.random.number();

    cy.mockGraphqlOp('UserAcceptedPostsForAction', {
      posts: [{ quantity: 10 }, { quantity: 20 }, { quantity: 30 }],
    });

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=total-accepted-quantity-value]').contains('60');
  });

  it('Renders 0 if approved posts query does not return any results', () => {
    const user = userFactory();
    const actionId = faker.random.number();

    cy.mockGraphqlOp('UserAcceptedPostsForAction', {
      posts: [],
    });

    cy.withFeatureFlags({
      voter_reg_alpha_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=total-accepted-quantity-value]').contains('0');
  });
});
