import React from 'react';
import tw from 'twin.macro';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { assign, get } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import { updateQuery } from '../../../helpers';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Spinner from '../../artifacts/Spinner/Spinner';
import PrimaryButton from '../../utilities/Button/PrimaryButton';

const PAGINATED_ACTION_STATS_QUERY = gql`
  query PaginatedActionStatsQuery(
    $actionId: Int
    $cursor: String
    $groupTypeId: Int
    $location: String
    $schoolId: String
  ) {
    stats: paginatedSchoolActionStats(
      actionId: $actionId
      after: $cursor
      first: 10
      groupTypeId: $groupTypeId
      location: $location
      orderBy: "impact,desc"
      schoolId: $schoolId
    ) {
      edges {
        cursor
        node {
          id
          impact
          location
          schoolId
          school {
            id
            name
            city
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const Table = tw.table`w-full border border-solid border-gray-200`;
const TableHeader = tw.thead`bg-blurple-500 font-bold p-4 pr-6 text-left text-white w-full`;
const TableCell = tw.td`p-2 text-sm md:text-base`;

const ActionStatsTable = ({
  actionId,
  groupTypeId,
  hideLoadMoreButton,
  schoolId,
  schoolLocation,
}) => {
  const variables = { actionId };

  if (groupTypeId) {
    assign(variables, { groupTypeId });
  }

  if (schoolLocation) {
    assign(variables, { location: schoolLocation });
  }

  if (schoolId) {
    assign(variables, { schoolId });
  }

  const { error, loading, data, fetchMore } = useQuery(
    PAGINATED_ACTION_STATS_QUERY,
    {
      variables,
      notifyOnNetworkStatusChange: true,
    },
  );

  const stats = data ? data.stats.edges : [];
  const noResults = stats.length === 0 && !loading;
  const { endCursor, hasNextPage } = get(data, 'stats.pageInfo', {});

  const handleViewMore = () => {
    fetchMore({
      variables: { cursor: endCursor },
      updateQuery,
    });
  };

  if (error) {
    return <ErrorBlock error={error} />;
  }

  let rank = 0;
  const displayRank = !schoolLocation;
  const colSpan = displayRank ? 4 : 3;

  const header = (
    <TableHeader>
      <tr>
        {displayRank ? <TableCell>National Rank</TableCell> : null}

        <TableCell>School Name</TableCell>

        <TableCell>Location</TableCell>

        <TableCell>Voter Registrations</TableCell>
      </tr>
    </TableHeader>
  );

  if (noResults && !hasNextPage) {
    return (
      <Table>
        {header}

        <tbody>
          <tr>
            <td className="bg-gray-100 px-10 pt-10 pb-32" colSpan={colSpan}>
              <div className="bg-white p-6 rounded">
                <h3>No Schools Found</h3>

                <p>
                  Uh oh! Looks like we don’t currently have any schools based on
                  your search criteria. Keep in mind that if your school has 0
                  registrations, it won’t show up in the leaderboard. Still have
                  questions? Email tej@dosomething.org for help.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  return (
    <Table>
      {header}

      <tbody>
        {stats.map(({ node, cursor }) => {
          const { impact, location, school } = node;

          rank += 1;

          return (
            <tr
              key={cursor}
              css={css`{background-color: #${
                rank % 2 === 0 ? 'f4f9ff' : 'ffffff'
              }`}
            >
              {displayRank ? <TableCell>{rank}</TableCell> : null}

              <TableCell>{school.name}</TableCell>

              <TableCell>
                {school.city}, {location.substring(3)}
              </TableCell>

              <TableCell>{impact}</TableCell>
            </tr>
          );
        })}
      </tbody>

      <tfoot className="form-actions">
        {loading ? (
          <tr>
            <td className="p-3" colSpan={colSpan}>
              <Spinner className="flex justify-center" />
            </td>
          </tr>
        ) : null}

        {hasNextPage && !hideLoadMoreButton ? (
          <tr>
            <td className="p-3" colSpan={colSpan}>
              <PrimaryButton
                onClick={handleViewMore}
                isDisabled={loading}
                text="Load More"
              />
            </td>
          </tr>
        ) : null}
      </tfoot>
    </Table>
  );
};

ActionStatsTable.propTypes = {
  actionId: PropTypes.number.isRequired,
  groupTypeId: PropTypes.number,
  hideLoadMoreButton: PropTypes.bool,
  schoolId: PropTypes.string,
  schoolLocation: PropTypes.string,
};

ActionStatsTable.defaultProps = {
  groupTypeId: null,
  hideLoadMoreButton: false,
  schoolId: null,
  schoolLocation: null,
};

export default ActionStatsTable;
