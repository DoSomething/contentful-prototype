/// <reference types="Cypress" />

import { MockList } from '../fixtures/graphql';
import { userFactory } from '../fixtures/user';
import { exampleCampaign } from '../fixtures/contentful';

describe('Campaign Gallery', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('React to a post', () => {
    const user = userFactory();

    cy.mockGraphqlOps({
      operations: {
        // Make sure we haven't yet reacted to anything:
        ActionGalleryQuery: {
          posts: MockList(9, { reacted: false, reactions: 0 }),
        },

        // And a predictable response when we toggle a reaction:
        ToggleReaction: ({ postId }) => ({
          toggleReaction: {
            id: postId,
            reactions: 1,
            reacted: true,
          },
        }),
      },
    });

    // Log in & visit the campaign action page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    // Let's pick a post & react to it...
    cy.nth('.post-gallery .post', 4).within(() => {
      // The post should not display the reaction total, since it's currently at zero:
      cy.get('.reaction__meta').should('not.exist');

      // React to the post.
      cy.get('.reaction__button').click();

      // The post should get a filled-in heart & display the total.
      cy.get('.reaction__button').should('have.class', '-reacted');
      cy.get('.reaction__meta').contains('1');
    });
  });

  it('Load additional pages', () => {
    const user = userFactory();

    // Start with a full page of posts...
    cy.mockGraphqlOp('ActionGalleryQuery', { posts: MockList(9) });

    // Log in & visit the campaign action page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.get('.post-gallery').within(() => {
      cy.get('.post').should('have.length', 9);

      // Click the "view more" link and get a partial set of results:
      cy.mockGraphqlOp('ActionGalleryQuery', { posts: MockList(4) });
      cy.contains('view more').click();

      // We should now have 13 total posts in the gallery.
      cy.get('.post').should('have.length', 13);
    });
  });
});
