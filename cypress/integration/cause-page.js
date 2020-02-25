/// <reference types="Cypress" />
import { GraphQLError } from 'graphql';
import { MockList } from '../fixtures/graphql';

describe('Cause Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Visit a non existent cause page', () => {
    cy.mockGraphqlOp('CausePageQuery', {
      causePageBySlug: null,
    });

    cy.visit('/us/causes/not-found');

    cy.contains('Not Found');
  });

  it('Visit a cause page with a triggered GraphQL error', () => {
    cy.mockGraphqlOp('CausePageQuery', {
      causePageBySlug: new GraphQLError('Oops!... I Did It Again'),
    });

    cy.visit('/us/causes/error');

    cy.contains('Something went wrong');
  });

  it('Visit a working cause page', () => {
    const superTitle = "Let's do something about the";
    const title = 'Environment';

    cy.mockGraphqlOp('CausePageQuery', {
      causePageBySlug: {
        superTitle,
        title,
        slug: 'education',
      },
    });

    cy.visit('/us/causes/education');

    cy.contains('h2', superTitle);
    cy.contains('h1', title);
  });

  it('Displays paginated campaign gallery', () => {
    cy.mockGraphqlOp('CausePageQuery', {
      causePageBySlug: {
        slug: 'education',
      },
    });

    // Stub the query to have a 'next page' so we show the 'view more' button.
    cy.mockGraphqlOp('PaginatedCampaignQuery', {
      paginatedCampaigns: {
        pageInfo: {
          hasNextPage: true,
        },
      },
    });

    cy.visit('/us/causes/education');

    // Find the 'view more' button.
    cy.get('[data-ref=paginated-campaign-gallery] button').then($btn => {
      // Now let's ensure that there's *not* another page once we click 'view more'.
      cy.mockGraphqlOp('PaginatedCampaignQuery', {
        paginatedCampaigns: {
          pageInfo: {
            hasNextPage: false,
          },
        },
      });

      $btn.click();

      // The button should no longer display.
      cy.get($btn.selector).should('not.exist');
    });
  });
});
