/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import userCampaignSignups from '../../resources/assets/helpers/__mocks__/userCampaignSignups';

describe('User Account Campaigns Tab', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays default text if a user has not posted a reportback', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('empty-state-block').should('have.length', 1);
  });

  /** @test */
  it('Displays user name for a non anonymous post', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          actionDetails: {
            anonymous: false,
          },
          user: {
            firstName: user.firstName,
          },
        },
      ],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('post-author').should('have.length', 1);
  });

  /** @test */
  it('Displays user name for a non anonymous post', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          actionDetails: {
            anonymous: true,
          },
          user: {
            firstName: user.firstName,
          },
        },
      ],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('anonymous-post-author').should('have.length', 1);
  });

  /** @test */
  it('Displays the caption of a text post at the top of the Postcard', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          type: 'text',
        },
      ],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('text-post-caption').should('have.length', 1);
  });

  context('With the user campaigns feature flag toggled on', () => {
    /** @test */
    it('Displays three tabs for the campaign completion categories', () => {
      const user = userFactory();

      cy.mockGraphqlOp('UserCampaignsQuery', {
        paginatedSignups: userCampaignSignups,
      });

      cy.login(user);
      cy.withFeatureFlags({ user_campaigns: true }).visit(
        `/us/account/campaigns`,
      );

      cy.findByTestId('incomplete-campaigns-tab').contains('Incomplete (2)');
      cy.findByTestId('complete-campaigns-tab').contains('Complete (2)');
      cy.findByTestId('expired-campaigns-tab').contains('Expired (1)');

      // Test that we default to the incomplete tab.
      cy.location().should(loc => {
        expect(loc.pathname).to.equal('/us/account/campaigns/incomplete');
      });
      cy.findAllByTestId('campaign-card').should('have.length', 2);

      // Test the other tabs.
      cy.findByTestId('complete-campaigns-tab').click();

      cy.location().should(loc => {
        expect(loc.pathname).to.equal('/us/account/campaigns/complete');
      });
      cy.findAllByTestId('campaign-card').should('have.length', 2);

      cy.findByTestId('expired-campaigns-tab').click();

      cy.location().should(loc => {
        expect(loc.pathname).to.equal('/us/account/campaigns/expired');
      });
      cy.findAllByTestId('campaign-card').should('have.length', 1);
    });

    /** @test */
    it('Hides the Expired tab if there are no expired campaigns', () => {
      const user = userFactory();

      // Mark the expired campaign fixture as 'evergreen'.
      const withoutExpiredCampaigns = Object.assign({}, userCampaignSignups);
      withoutExpiredCampaigns.edges[3].node.campaign.endDate = null;

      cy.mockGraphqlOp('UserCampaignsQuery', {
        paginatedSignups: withoutExpiredCampaigns,
      });

      cy.login(user);
      cy.withFeatureFlags({ user_campaigns: true }).visit(
        `/us/account/campaigns`,
      );

      cy.findByTestId('expired-campaigns-tab').should('have.length', 0);
    });
  });
});
