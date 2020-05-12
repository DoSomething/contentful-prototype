/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';
import { PHOENIX_URL } from '../../resources/assets/constants';
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

describe('Alpha Voter Registration Drive (OVRD) Page', () => {
  beforeEach(() => {
    cy.configureMocks();
    // Mock the ContentBlock queries used for various sections on the alpha OVRD page.
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ContentBlock',
        superTitle: faker.lorem.words(),
        title: faker.company.bsBuzz(),
        subTitle: faker.lorem.words(),
        content: faker.lorem.sentence(),
      },
    });
  });

  it('The blocks field of the Alpha OVRD action page is not displayed', () => {
    const user = userFactory();

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

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

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=referral-list-item-empty]').should('have.length', 3);
    cy.get('[data-test=referral-list-item-completed]').should('have.length', 0);
    cy.get('[data-test=additional-referrals-count]').should('have.length', 0);
  });

  it('Alpha OVRD page displays 2 completed icons if user has 2 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('AlphaVoterRegistrationReferrals', {
      posts: [fakePost('Jesus Q.'), fakePost('Walter S.')],
    });

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

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

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

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

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=total-accepted-quantity-value]').contains('60');
  });

  it('Renders 0 if approved posts query does not return any results', () => {
    const user = userFactory();
    const actionId = faker.random.number();

    cy.mockGraphqlOp('UserAcceptedPostsForAction', {
      posts: [],
    });

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('[data-test=total-accepted-quantity-value]').contains('0');
  });

  it('Alpha OVRD page SocialDriveAction links to legacy beta page when beta page feature disabled', () => {
    const user = userFactory();

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('.social-drive-action h1').contains('Your Online Drive');
    cy.get('.link-bar input').should(
      'contain.value',
      `https://vote.dosomething.org/member-drive?userId=${user.id}&r=user:${user.id},source:web,source_details:onlinedrivereferral,referral=true`,
    );
    cy.get('[data-test=voting-reasons-query-options]').should('have.length', 0);
    cy.get('[data-test=social-share-tray-title]').contains(
      'Share on Social Media',
    );
  });

  it('Alpha OVRD page SocialDriveAction links to internal beta page when beta page feature enabled', () => {
    const user = userFactory();

    cy.withFeatureFlags({
      voter_reg_beta_page: true,
    }).authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('.social-drive-action h1').contains('Share with your friends');
    cy.get('.link-bar input').should(
      'contain.value',
      `${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${user.id}`,
    );
    cy.get('[data-test=voting-reasons-query-options]').should('have.length', 1);
    cy.get('[data-test=social-share-tray-title]').should('have.length', 0);
  });
});
