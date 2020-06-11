/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';
import { PHOENIX_URL } from '../../resources/assets/constants';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

const blockId = '7un2ZfYO3mrpARy6ZzaUZC';

/**
 * @param String displayName
 * @return Object
 */
function fakePost(displayName) {
  return {
    id: faker.random.number(),
    user: { displayName },
  };
}

const contentfulBlockQueryResult = {
  block: {
    id: blockId,
    __typename: 'VoterRegistrationDriveBlock',
    approvedPostCountActionId: 21,
    description: faker.lorem.paragraph(),
    title: 'Share with your friends',
  },
};

describe('Voter Registration Drive Action', () => {
  beforeEach(() => {
    cy.configureMocks();
    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);
    // Mock a Bertly API error to ensure the longUrl will appear in the input field.
    cy.route({
      method: 'POST',
      url: '/api/v2/links',
      status: 503,
      response: {},
    });
  });

  it('Renders sum of quantity if approved posts query returns results', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserAcceptedPostsForAction', {
      posts: [{ quantity: 10 }, { quantity: 20 }, { quantity: 30 }],
    });
    cy.mockGraphqlOp('CampaignSignup', {
      signups: [{ id: 11122016, group: null }],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.get('[data-test=total-accepted-quantity-value]').contains('60');
  });

  it('Renders 0 if approved posts query does not return any results', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserAcceptedPostsForAction', {
      posts: [],
    });
    cy.mockGraphqlOp('CampaignSignup', {
      signups: [{ id: 11122016, group: null }],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.get('[data-test=total-accepted-quantity-value]').contains('0');
  });

  it('Links to /us/my-voter-registration-drive with referrer_user_id query', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSignup', {
      signups: [{ id: 11122016, group: null }],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.get('.social-drive-action h1').contains(
      contentfulBlockQueryResult.block.title,
    );
    cy.get('.social-drive-action').contains(
      contentfulBlockQueryResult.block.description,
    );
    cy.get('.link-bar input').should(
      'contain.value',
      `${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${user.id}`,
    );
    cy.get('[data-test=voting-reasons-query-options]').should('have.length', 1);
    cy.get('[data-test=social-share-tray-title]').should('have.length', 0);
  });

  it('Appends group_id query to link if signed up with group', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSignup', {
      signups: [{ id: 11122016, group: { id: 7 } }],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.get('.social-drive-action h1').contains(
      contentfulBlockQueryResult.block.title,
    );
    cy.get('.social-drive-action').contains(
      contentfulBlockQueryResult.block.description,
    );
    cy.get('.link-bar input').should(
      'contain.value',
      `${PHOENIX_URL}/us/my-voter-registration-drive?group_id=7&referrer_user_id=${user.id}`,
    );
    cy.get('[data-test=voting-reasons-query-options]').should('have.length', 1);
    cy.get('[data-test=social-share-tray-title]').should('have.length', 0);
  });

  it('Appends voting-reasons query parameter to link when checking options', () => {
    const user = userFactory();
    const longUrl = `${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${user.id}`;

    cy.mockGraphqlOp('CampaignSignup', {
      signups: [{ id: 11122016, group: null }],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.get('#mental-health').check();
    cy.get('.link-bar input').should(
      'contain.value',
      `${longUrl}&voting-reasons=mental-health`,
    );

    cy.get('#student-debt').check();
    cy.get('.link-bar input').should(
      'contain.value',
      `${longUrl}&voting-reasons=mental-health%2Cstudent-debt`,
    );

    cy.get('#student-debt').check();
    cy.get('.link-bar input').should(
      'contain.value',
      `${longUrl}&voting-reasons=mental-health`,
    );

    cy.get('#mental-health').check();
    cy.get('.link-bar input').should('contain.value', longUrl);
  });
});
