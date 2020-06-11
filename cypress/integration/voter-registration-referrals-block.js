import faker from 'faker';

import { userFactory } from '../fixtures/user';
import { groupFactory } from '../fixtures/group';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

const blockId = '5APr82PRUm6WHtHF8cwa7K';

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
    __typename: 'VoterRegistrationReferralsBlock',
    approvedPostCountActionId: 21,
    title: faker.company.catchPhrase(),
  },
};

describe('Voter Registration Referrals Block', () => {
  beforeEach(() => {
    cy.configureMocks();
    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);
  });

  it('Individual displays three empty icons if user has no referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: null }],
    });
    cy.mockGraphqlOp('IndividualVoterRegistrationReferralsQuery', {
      posts: [],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('referral-list-item-empty').should('have.length', 3);
    cy.findAllByTestId('referral-list-item-completed').should('have.length', 0);
    cy.findByTestId('additional-referrals-count').should('have.length', 0);
  });

  it('Individual displays 2 completed icons if user has 2 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: null }],
    });
    cy.mockGraphqlOp('IndividualVoterRegistrationReferralsQuery', {
      posts: [fakePost('Jesus Q.'), fakePost('Walter S.')],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('referral-list-item-completed').should('have.length', 2);
    cy.nth('[data-testid=referral-list-item-completed]', 0).within(() => {
      cy.findByTestId('referral-list-item-label').contains('Jesus Q.');
    });
    cy.nth('[data-testid=referral-list-item-completed]', 1).within(() => {
      cy.findByTestId('referral-list-item-label').contains('Walter S.');
    });
    cy.findAllByTestId('referral-list-item-empty').should('have.length', 1);
    cy.findByTestId('additional-referrals-count').should('have.length', 0);
  });

  it('Individual displays 3 completed icons and additional count if user has 5 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group: null }],
    });
    cy.mockGraphqlOp('IndividualVoterRegistrationReferralsQuery', {
      posts: [
        fakePost('Sarah C.'),
        fakePost('Kyle R.'),
        fakePost('John C.'),
        fakePost('Miles D.'),
        fakePost('Tarissa D.'),
      ],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('referral-list-item-completed').should('have.length', 3);
    cy.nth('[data-testid=referral-list-item-completed]', 0).within(() => {
      cy.findByTestId('referral-list-item-label').contains('Sarah C.');
    });
    cy.nth('[data-testid=referral-list-item-completed]', 1).within(() => {
      cy.findByTestId('referral-list-item-label').contains('Kyle R.');
    });
    cy.nth('[data-testid=referral-list-item-completed]', 2).within(() => {
      cy.findByTestId('referral-list-item-label').contains('John C.');
    });
    cy.findAllByTestId('referral-list-item-empty').should('have.length', 0);
    cy.findByTestId('additional-referrals-count').contains('+ 2 more');
  });

  it('Group displays group goal, group referrals count, and individual referrals count', () => {
    const user = userFactory();
    const group = groupFactory();

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group }],
    });
    cy.mockGraphqlOp('GroupVoterRegistrationReferralsQuery', {
      groupReferrals: () => [
        fakePost('Sarah C.'),
        fakePost('Kyle R.'),
        fakePost('John C.'),
        fakePost('Miles D.'),
        fakePost('Tarissa D.'),
      ],
      individualReferrals: () => [fakePost('Sarah C.')],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('group-goal').contains(group.goal);
    // TODO: This should be 5. Is it possible to mock aliased queries?
    // cy.findAllByTestId('group-total').contains(5);
    // cy.findAllByTestId('individual-total').contains(1);
  });

  it('Group displays group goal as 50 if not set on group', () => {
    const user = userFactory();
    const group = groupFactory();
    group.goal = null;

    cy.mockGraphqlOp('CampaignSignupQuery', {
      signups: [{ id: 11122016, group }],
    });
    // TODO: Fix me (same as test above).
    cy.mockGraphqlOp('GroupVoterRegistrationReferralsQuery', {
      posts: [],
    });

    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    cy.findAllByTestId('group-goal').contains(50);
    cy.findAllByTestId('group-total').contains(0);
    cy.findAllByTestId('individual-total').contains(0);
  });
});
