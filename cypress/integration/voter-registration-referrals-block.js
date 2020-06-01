import faker from 'faker';

import { userFactory } from '../fixtures/user';

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

  it('Displays three empty icons if user has no referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationReferrals', {
      posts: [],
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.get('[data-test=referral-list-item-empty]').should('have.length', 3);
    cy.get('[data-test=referral-list-item-completed]').should('have.length', 0);
    cy.get('[data-test=additional-referrals-count]').should('have.length', 0);
  });

  it('Displays 2 completed icons if user has 2 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationReferrals', {
      posts: [fakePost('Jesus Q.'), fakePost('Walter S.')],
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.get('[data-test=referral-list-item-completed]').should('have.length', 2);
    cy.nth('[data-test=referral-list-item-completed]', 0).within(() => {
      cy.get('.figure__body').contains('Jesus Q.');
    });
    cy.nth('[data-test=referral-list-item-completed]', 1).within(() => {
      cy.get('.figure__body').contains('Walter S.');
    });
    cy.get('[data-test=referral-list-item-empty]').should('have.length', 1);
    cy.get('[data-test=additional-referrals-count]').should('have.length', 0);
  });

  it('Displays 3 completed icons and additional count if user has 5 referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegistrationReferrals', {
      posts: [
        fakePost('Sarah C.'),
        fakePost('Kyle R.'),
        fakePost('John C.'),
        fakePost('Miles D.'),
        fakePost('Tarissa D.'),
      ],
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.get('[data-test=referral-list-item-completed]').should('have.length', 3);
    cy.nth('[data-test=referral-list-item-completed]', 0).within(() => {
      cy.get('p').contains('Sarah C.');
    });
    cy.nth('[data-test=referral-list-item-completed]', 1).within(() => {
      cy.get('.figure__body').contains('Kyle R.');
    });
    cy.nth('[data-test=referral-list-item-completed]', 2).within(() => {
      cy.get('.figure__body').contains('John C.');
    });
    cy.get('[data-test=referral-list-item-empty]').should('have.length', 0);
    cy.get('[data-test=additional-referrals-count]').contains('+ 2 more');
  });
});
