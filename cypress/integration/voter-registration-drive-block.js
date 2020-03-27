/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

/**
 * This ID correponds to the dev Contentful entry for a socialDriveAction that is configured
 * to display page views. We only enable this setting for voter registration drives.
 */
const blockId = '2T5ARr1AViKw2Kw0Q4S0so';

describe('Voter Registration Drive', () => {
  beforeEach(() => cy.configureMocks());

  it('Renders count of voter registration referrals when value is under 50', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        id: '2T5ARr1AViKw2Kw0Q4S0so',
        __typename: 'SocialDriveBlock',
        link: 'https://vote.dosomething.org',
        hidePageViews: false,
      },
    });

    cy.mockGraphqlOp('UserVoterRegistrationReferralCount', {
      postsCount: (root, { referrerUserId }) => 11,
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.contains('.page-views__text', 'Total page views');
    cy.contains('.voter-registrations__text', 'Total voter registrations');
    cy.contains('h1.voter-registrations__amount', 11);
  });

  it('Renders 50+ voter registration referrals if count is over 50', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        id: '2T5ARr1AViKw2Kw0Q4S0so',
        __typename: 'SocialDriveBlock',
        link: 'https://vote.dosomething.org',
        hidePageViews: false,
      },
    });

    cy.mockGraphqlOp('UserVoterRegistrationReferralCount', {
      postsCount: (root, { referrerUserId }) => 51,
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.contains('.page-views__text', 'Total page views');
    cy.contains('.voter-registrations__text', 'Total voter registrations');
    cy.contains('h1.voter-registrations__amount', '50+');
  });
});
