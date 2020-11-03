/// <reference types="Cypress" />
import faker from 'faker';

import { userFactory } from '../fixtures/user';

const actionId = faker.random.number();
const blockId = '51SWUaRvyhsJsTWHRGGfjK';
const url = `us/blocks/${blockId}`;

const contentfulBlockQueryResult = {
  block: {
    id: blockId,
    __typename: 'ActionStatsBlock',
    actionId,
  },
};

/**
 * Returns an mock instance of the SchoolActionStat type.
 *
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
    cy.mockGraphqlOp('SchoolActionStatsLeaderQuery', {
      schoolActionStats: topThreeStats,
    });
  });

  it('Displays leaderboard and table that paginates through results', () => {
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

    cy.visit(url);

    cy.nth('[data-testid=action-stats-leaderboard-rank]', 0).should(
      'have.class',
      'bg-yellow-500',
    );
    cy.nth('[data-testid=action-stats-leaderboard-rank]', 1).should(
      'have.class',
      'bg-purple-500',
    );
    cy.nth('[data-testid=action-stats-leaderboard-rank]', 2).should(
      'have.class',
      'bg-blurple-500',
    );

    cy.findAllByTestId('load-more-stats-button').should('have.length', 1);

    cy.mockGraphqlOp('PaginatedActionStatsQuery', {
      paginatedSchoolActionStats: {
        edges: [
          schoolActionStat(43),
          schoolActionStat(23),
          schoolActionStat(12),
        ].map(stat => {
          return { node: stat };
        }),
        pageInfo: {
          hasNextPage: false,
        },
      },
    });

    cy.findAllByTestId('load-more-stats-button').click();

    cy.findAllByTestId('load-more-stats-button').should('have.length', 0);
  });

  describe('Location filter', () => {
    it('Filters results by location if location selected', () => {
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

      cy.visit(url);

      let firstRow = cy
        .findAllByTestId('action-stats-table-body')
        .children()
        .first();

      // Four cells present when not filtering by location.
      firstRow.children().should('have.length', 4);

      const stat = schoolActionStat(23);

      cy.mockGraphqlOp('PaginatedActionStatsQuery', {
        paginatedSchoolActionStats: {
          edges: [stat].map(stat => {
            return { node: stat };
          }),
          pageInfo: {
            hasNextPage: false,
          },
        },
      });

      cy.get('#react-select-select-state--input').type('A', { force: true });
      cy.get('#react-select-select-state--option-0').click({ force: true });

      cy.findAllByTestId('action-stats-table-body')
        .children()
        .should('have.length', 1);

      firstRow = cy
        .findAllByTestId('action-stats-table-body')
        .children()
        .first();
      // Only three cells present when filtering by location.
      firstRow.children().should('have.length', 3);
    });

    it('Displays no results content if no stats found for selected location', () => {
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
      cy.visit(url);

      cy.mockGraphqlOp('PaginatedActionStatsQuery', {
        paginatedSchoolActionStats: {
          edges: [],
          pageInfo: {
            hasNextPage: false,
          },
        },
      });

      cy.get('#react-select-select-state--input').type('A', { force: true });
      cy.get('#react-select-select-state--option-0').click({ force: true });

      cy.findAllByTestId('action-stats-table-body').should('have.length', 0);
      cy.findAllByTestId('action-stats-not-found').should('have.length', 1);
    });
  });
});
