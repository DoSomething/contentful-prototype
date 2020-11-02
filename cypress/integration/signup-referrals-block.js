/// <reference types="Cypress" />
import faker from 'faker';

import { userFactory } from '../fixtures/user';

const blockId = '2eDT9YCur8YhK0LskcFXNF';

const contentfulBlockQueryResult = {
  block: {
    id: blockId,
    __typename: 'SignupReferralsBlock',
    title: faker.company.catchPhrase(),
  },
};

describe('Signup Referrals Block', () => {
  beforeEach(() => {
    cy.configureMocks();
  });

  describe('Section Header', () => {
    beforeEach(() => {
      cy.mockGraphqlOp('SignupReferrals', {
        signups: [{ id: 11122016, group: null }],
      });
    });

    it('Displays default text if title null', () => {
      const user = userFactory();

      cy.mockGraphqlOp('ContentfulBlockQuery', {
        block: {
          id: blockId,
          __typename: 'SignupReferralsBlock',
          title: null,
        },
      });

      cy.authVisitBlockPermalink(user, blockId);

      cy.get('.section-header__title').contains('Your Referrals');
    });

    it('Displays title field if present', () => {
      const user = userFactory();

      cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);

      cy.authVisitBlockPermalink(user, blockId);

      cy.get('.section-header__title').contains(
        contentfulBlockQueryResult.block.title,
      );
    });
  });

  describe('Referrals description', () => {
    beforeEach(() => {
      cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);
    });

    it('Displays singular text if one signup referral was found', () => {
      const user = userFactory();

      cy.mockGraphqlOp('SignupReferrals', {
        signups: [{ id: 11122016, group: null }],
      });

      cy.authVisitBlockPermalink(user, blockId);

      cy.findAllByTestId('referrals-count-description').contains(
        'You have referred 1 person so far who has signed up for a campaign.',
      );
      cy.findAllByTestId('referrals-gallery').should('have.length', 1);
      cy.findAllByTestId('referral-list-item-completed').should(
        'have.length',
        1,
      );
    });

    it('Displays singular text if one unique referrerd user was found', () => {
      const user = userFactory();

      cy.mockGraphqlOp('SignupReferrals', {
        signups: [
          { id: 11122016, group: null, userId: '5554eac1a59dbf117e8b4567' },
          { id: 11122019, group: null, userId: '5554eac1a59dbf117e8b4567' },
        ],
      });

      cy.authVisitBlockPermalink(user, blockId);

      cy.findAllByTestId('referrals-count-description').contains(
        'You have referred 1 person so far who has signed up for a campaign.',
      );
      cy.findAllByTestId('referrals-gallery').should('have.length', 1);
      cy.findAllByTestId('referral-list-item-completed').should(
        'have.length',
        1,
      );
    });

    it('Displays plural text if signup referrals were found for more than 1 unique referred user', () => {
      const user = userFactory();

      cy.mockGraphqlOp('SignupReferrals', {
        signups: [
          { id: 11122018, group: null, userId: '5554eac1a59dbf117e8b4567' },
          { id: 13122016, group: null, userId: '557775e9a59dbf3b7a8b457b' },
        ],
      });

      cy.authVisitBlockPermalink(user, blockId);

      cy.findAllByTestId('referrals-count-description').contains(
        'You have referred 2 people so far who have signed up for a campaign.',
      );
      cy.findAllByTestId('referrals-gallery').should('have.length', 1);
      cy.findAllByTestId('referral-list-item-completed').should(
        'have.length',
        2,
      );
    });
  });
});
