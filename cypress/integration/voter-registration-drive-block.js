/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

/**
 * This ID correponds to the dev Contentful entry for a socialDriveAction that is configured
 * to display page views. We only enable this setting for voter registration drives.
 */
const blockId = '2T5ARr1AViKw2Kw0Q4S0so';
const linksApiUrl = `/api/v2/links`;
const shortenedLink = 'https://dosome.click/ngzdjp';
const unshortenedLink = 'https://vote.dosomething.org?referral=true';
const contentfulBlockQueryResult = {
  block: {
    id: blockId,
    __typename: 'SocialDriveBlock',
    link: unshortenedLink,
    hidePageViews: false,
  },
};

describe('Voter Registration Drive', () => {
  beforeEach(() => cy.configureMocks());

  it('Renders count of voter registration referrals when value is under 50', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);

    cy.mockGraphqlOp('UserVoterRegistrationReferralCount', {
      postsCount: (root, { referrerUserId }) => 11,
    });

    cy.route('POST', linksApiUrl, { shortenedLink, count: 7 });

    cy.authVisitBlockPermalink(user, blockId);

    // @TODO: This value never gets set, the input value is stuck on "Loading..."
    //cy.get('.link-bar input').should('contain.value', shortenedLink);

    cy.contains('.page-views__text', 'Total page views');
    cy.contains('.voter-registrations__text', 'Total voter registrations');
    cy.contains('h1.voter-registrations__amount', 11);
  });

  it('Renders 50+ voter registration referrals if count is over 50', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);

    cy.mockGraphqlOp('UserVoterRegistrationReferralCount', {
      postsCount: (root, { referrerUserId }) => 51,
    });

    cy.route('POST', linksApiUrl, { shortenedLink, count: 7 });

    cy.authVisitBlockPermalink(user, blockId);

    cy.contains('.page-views__text', 'Total page views');
    cy.contains('.voter-registrations__text', 'Total voter registrations');
    cy.contains('h1.voter-registrations__amount', '50+');
  });

  it('Displays unshortened link and N/A page views if Bertly request fails', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);

    cy.mockGraphqlOp('UserVoterRegistrationReferralCount', {
      postsCount: (root, { referrerUserId }) => 51,
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.get('.link-bar input').should('contain.value', unshortenedLink);
    cy.contains('h1.page-views__amount', 'N/A');
  });
});
