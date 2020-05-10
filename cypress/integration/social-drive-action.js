/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

/**
 * This ID correponds to a dev Contentful entry for a socialDriveAction.
 *
 * @see docs/development/content-types/social-drive-action.md
 */
const blockId = '2T5ARr1AViKw2Kw0Q4S0so';

// Configure mock data to use for each test:
const user = userFactory();
const linksApiUrl = `/api/v2/links`;
const shortenedLink = 'https://dosome.click/ngzdjp';
const unshortenedLink = `https://example.dosomething.org/puppet-sloth?userId=${user.id}`;
const contentfulBlockQueryResult = {
  block: {
    id: blockId,
    __typename: 'SocialDriveBlock',
    link: unshortenedLink,
  },
};

describe('Social Action Drive', () => {
  beforeEach(() => cy.configureMocks());

  it('Displays short URL in text input if successful post to links API', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);

    cy.route('POST', linksApiUrl, { url: shortenedLink });

    cy.authVisitBlockPermalink(user, blockId);

    cy.get('.link-bar input').should('contain.value', shortenedLink);
  });

  it('Displays unshortened link and N/A page views if links API request fails', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);

    cy.authVisitBlockPermalink(user, blockId);

    cy.get('.link-bar input').should('contain.value', unshortenedLink);
  });
});
