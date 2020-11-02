/// <reference types="Cypress" />
import faker from 'faker';

import { userFactory } from '../fixtures/user';

const actionId = faker.random.number();
const blockId = '51SWUaRvyhsJsTWHRGGfjK';
const user = userFactory();

const contentfulBlockQueryResult = {
  block: {
    id: blockId,
    __typename: 'ActionStatsBlock',
    actionId,
  },
};

describe('Action Stats Block', () => {
  beforeEach(() => {
    cy.configureMocks();
    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);
  });

  it('Displays leaderboard and table with load more if more than 10 records', () => {
    cy.mockGraphqlOp('SchoolActionStatsLeaderQuery', {
      schoolActionStats: [
        { actionId, schoolId: '11122016', impact: 20 },
        { actionId, schoolId: '21022010', impact: 14 },
      ],
    });
    cy.mockGraphqlOp('PaginatedActionStatsQuery', {
      paginatedSchoolActionStats: {
        edges: [
          { actionId, schoolId: '11122016' },
          { actionId, schoolId: '21022010' },
        ],
        pageInfo: {
          hasNextPage: true,
        },
      },
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.contains('leaderboard');
  });
});
