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
    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);
  });

  it('Displays singular text if one signup referral was found', () => {
    const user = userFactory();

    cy.mockGraphqlOp('SignupReferrals', {
      signups: [{ id: 11122016, group: null }],
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.get('.section-header__title').contains(
      contentfulBlockQueryResult.block.title,
    );
    cy.findAllByTestId('referrals-count-description').contains(
      'You have referred 1 person so far who has signed up for a campaign.',
    );
  });
});
