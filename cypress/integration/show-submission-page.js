/// <reference types="Cypress" />

import { MockList } from '../fixtures/graphql';

describe('Show Submission Page', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the post image, default affirmation content, and a gallery block for the recommended campaigns', () => {
    cy.mockGraphqlOp('PostQuery', {
      post: {
        campaignId: 1,
      },
    });

    cy.mockGraphqlOp('ScholarshipCampaignsQuery', {
      searchCampaigns: {
        edges: MockList(3),
      },
    });

    cy.withFeatureFlags({ post_confirmation_page: true }).visit('/us/posts/1');

    cy.findByTestId('post-submission-image').should('have.length', 1);

    cy.contains('Thanks for joining the movement!');

    cy.findByTestId('gallery-block')
      .should('have.length', 1)
      .within(() => {
        cy.findAllByTestId('scholarship-card').should('have.length', 3);
      });
  });

  it.only('Displays the custom affirmation content if Contentful ID query parameter is provided', () => {
    const affirmationContent = "Here's some custom affirmation content for ya!";

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'PhotoSubmissionBlock',
        affirmationContent,
      },
    });

    cy.withFeatureFlags({ post_confirmation_page: true }).visit(
      '/us/posts/1?submissionActionId=abc',
    );

    cy.contains(affirmationContent);
  });
});
