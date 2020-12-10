/// <reference types="Cypress" />

import { MockList } from '../fixtures/graphql';
import { userFactory } from '../fixtures/user';

describe('Show Submission Page', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Is gated to authenticated users', () => {
    cy.withFeatureFlags({ post_confirmation_page: true }).visit('/us/posts/1');

    cy.get('[data-test="redirect"]').should('have.length', 1);
    cy.findByTestId('show-submission-page').should('have.length', 0);
  });

  /** @test */
  it("Is gated to the post's author, and redirects others to their account submissions page", () => {
    const user = userFactory();

    cy.mockGraphqlOp('PostQuery', {
      post: {
        userId: "Not the post's ID that's for sure!",
      },
    });

    cy.withFeatureFlags({ post_confirmation_page: true })
      .login(user)
      .visit('/us/posts/1');

    cy.location('pathname').should('eq', `/us/account/campaigns`);
  });

  /** @test */
  it('Displays the post image, default affirmation content, and a gallery block for the recommended campaigns', () => {
    const user = userFactory();

    cy.mockGraphqlOp('PostQuery', {
      post: {
        campaignId: 1,
        userId: user.id,
      },
    });

    cy.mockGraphqlOp('ScholarshipCampaignsQuery', {
      searchCampaigns: {
        edges: MockList(3),
      },
    });

    cy.withFeatureFlags({ post_confirmation_page: true })
      .login(user)
      .visit('/us/posts/1');

    cy.findByTestId('post-submission-image').should('have.length', 1);

    cy.contains('Thanks for joining the movement!');

    cy.findByTestId('gallery-block')
      .should('have.length', 1)
      .within(() => {
        cy.findAllByTestId('scholarship-card').should('have.length', 3);
      });
  });

  it('Displays the custom affirmation content if Contentful ID query parameter is provided', () => {
    const user = userFactory();

    const affirmationContent = "Here's some custom affirmation content for ya!";

    cy.mockGraphqlOp('PostQuery', {
      post: {
        userId: user.id,
      },
    });

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'PhotoSubmissionBlock',
        affirmationContent,
      },
    });

    cy.withFeatureFlags({ post_confirmation_page: true })
      .login(user)
      .visit('/us/posts/1?submissionActionId=abc');

    cy.contains(affirmationContent);
  });
});
