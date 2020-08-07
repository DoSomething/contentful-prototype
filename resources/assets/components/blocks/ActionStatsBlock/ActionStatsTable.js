import React from 'react';
import tw from 'twin.macro';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
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
    $location: String
    $schoolId: String
  ) {
    stats: paginatedSchoolActionStats(
      actionId: $actionId
      after: $cursor
      first: 10
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

const TableHeader = tw.thead`bg-blurple-500 font-bold p-4 pr-6 text-left text-white`;
const TableCell = tw.td`p-2 text-base`;

const ActionStatsTable = ({ actionId, schoolId, schoolLocation }) => {
  const variables = { actionId };

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

  if (noResults && !hasNextPage) {
    return <div>No results</div>;
  }

  let rank = 0;

  return (
    <>
      <table className="w-full">
        <TableHeader>
          <tr>
            <TableCell>{schoolLocation ? 'State' : 'National'} Rank</TableCell>

            <TableCell>School Name</TableCell>

            <TableCell>Location</TableCell>

            <TableCell>Voter Registrations</TableCell>
          </tr>
        </TableHeader>

        <tbody>
          {stats.map(({ node, cursor }) => {
            const { impact, location, school } = node;

            rank += 1;

            return (
              <tr key={cursor}>
                <TableCell>{rank}</TableCell>

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
              <td className="p-3" colSpan="4">
                <Spinner className="flex justify-center" />
              </td>
            </tr>
          ) : null}

          {hasNextPage ? (
            <tr>
              <td className="p-3" colSpan="4">
                <PrimaryButton
                  onClick={handleViewMore}
                  isDisabled={loading}
                  text="Load More"
                />
              </td>
            </tr>
          ) : null}
        </tfoot>
      </table>
    </>
  );
};

ActionStatsTable.propTypes = {
  actionId: PropTypes.number.isRequired,
  schoolId: PropTypes.string,
  schoolLocation: PropTypes.string,
};

ActionStatsTable.defaultProps = {
  schoolId: null,
  schoolLocation: null,
};

export default ActionStatsTable;
