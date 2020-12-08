/// <reference types="Cypress" />
import { MockList } from '../fixtures/graphql';

describe('Campaign Index Page', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  context('without the algolia search feature flag', () => {
    it('Renders a paginated campaign gallery', () => {
      cy.mockGraphqlOp('PaginatedCampaignQuery', {
        paginatedCampaigns: {
          // Ensure the results aren't group campaigns since we'll manually filter those out.
          edges: MockList(36, { node: { groupTypeId: null } }),
        },
      });

      cy.visit('/us/campaigns');

      cy.findByTestId('paginated-campaign-gallery').within(() => {
        cy.findAllByTestId('campaign-card').should('have.length', 36);
      });
    });
  });

  context('with the algolia search feature flag', () => {
    it('Renders a paginated campaign gallery', () => {
      cy.mockGraphqlOp('SearchCampaignQuery', {
        searchCampaigns: {
          edges: MockList(36, { node: {} }),
        },
      });

      cy.withFeatureFlags({ algolia_campaigns_search: true }).visit(
        '/us/campaigns',
      );

      cy.findByTestId('paginated-campaign-gallery').within(() => {
        cy.findAllByTestId('campaign-card').should('have.length', 36);
      });
    });
  });
});
