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
      url: 'https://mock.dosome.click/',
      status: 503,
      response: {},
    });
  });

  it('Links to /us/my-voter-registration-drive with referrer_user_id query', () => {
    const user = userFactory();
    const expectedUrl = `${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${user.id}`;

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: null }],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findByTestId('voter-registration-drive-action-card').contains(
      contentfulBlockQueryResult.block.title,
    );
    cy.findByTestId('voter-registration-drive-action-description').contains(
      contentfulBlockQueryResult.block.description,
    );
    cy.get('.link-bar input').should('contain.value', expectedUrl);
    cy.get('[data-test=voting-reasons-query-options]').should('have.length', 1);
    cy.findByTestId('social-share-tray-title').should('have.length', 0);
  });

  it('Appends group_id query to link if signed up with group', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: { id: 7 } }],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

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

    cy.mockGraphqlOp('CampaignSignupQuery', {
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
