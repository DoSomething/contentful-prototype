/// <reference types="Cypress" />

import { cloneDeep } from 'lodash';
import { campaignId } from '../fixtures/constants';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

describe('Groups Campaign Signup', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Visits a groups campaign page, as an unauthenticated user', () => {
    cy.mockGraphqlOp('SearchGroupsQuery', {
      groups: [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Philadelphia' },
        { id: 3, name: 'San Francisco' },
      ],
    });

    // Visit the campaign pitch page
    cy.withState(exampleCampaign).visit(
      '/us/campaigns/test-example-campaign?group_type_id=1',
    );

    cy.findByTestId('campaign-banner-signup-form').contains(
      'button',
      'Join Group',
    );
    cy.findByTestId('join-group-signup-button').should('be.disabled');
    cy.get('#select-group-dropdown').click();
    cy.get('#react-select-select-group--option-0').click();
    cy.findByTestId('join-group-signup-button').should('be.enabled');
  });
});
