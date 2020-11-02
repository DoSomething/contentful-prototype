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

/**
 * @param {Number} impact
 * @return {Object}
 */
function schoolActionStat(impact) {
  const schoolId = faker.random.uuid();

  return {
    actionId,
    impact,
    location: `US-${faker.address.stateAbbr()}`,
    schoolId,
    school: {
      id: schoolId,
      city: faker.address.city(),
      name: faker.company.companyName(),
    },
  };
}

const topThreeStats = [
  schoolActionStat(200),
  schoolActionStat(140),
  schoolActionStat(78),
];

describe('Action Stats Block', () => {
  beforeEach(() => {
    cy.configureMocks();
    cy.mockGraphqlOp('ContentfulBlockQuery', contentfulBlockQueryResult);
  });

  it('Displays leaderboard and table with load more button if first page has more results', () => {
    cy.mockGraphqlOp('SchoolActionStatsLeaderQuery', {
      schoolActionStats: topThreeStats,
    });
    cy.mockGraphqlOp('PaginatedActionStatsQuery', {
      paginatedSchoolActionStats: {
        edges: topThreeStats.map(stat => {
          return { node: stat };
        }),
        pageInfo: {
          hasNextPage: true,
        },
      },
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.findAllByTestId('load-more-stats-button').should('have.length', 1);
  });
});
