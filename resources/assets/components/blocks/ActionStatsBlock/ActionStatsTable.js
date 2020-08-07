import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { assign, get, isArray, mergeWith } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Spinner from '../../artifacts/Spinner/Spinner';

const ACTION_STATS_TABLE_QUERY = gql`
  query ActionStatsTableQuery {
    stats: paginatedSchoolActionStats {
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
            state
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

/**
 * This component handles fetching & paginating a list of action stats.
 *
 * @param {Number} actionId
 * @param {String} schoolId
 */
const ActionStatsTable = ({ actionId, location, schoolId }) => {
  const variables = { actionId };
  console.log(variables);

  if (location) {
    assign(variables, { location });
  }

  if (schoolId) {
    assign(variables, { schoolId });
  }

  const { error, loading, data, fetchMore } = useQuery(
    ACTION_STATS_TABLE_QUERY,
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
      updateQuery: (previous, { fetchMoreResult }) => {
        return mergeWith({}, previous, fetchMoreResult, (dest, src) => {
          // By default, Lodash's `merge` would try to merge *each* array
          // item (e.g. `edges[0]` with then next page's `edges[0]`).
          if (isArray(dest)) {
            return [...dest, ...src];
          }
        });
      },
    });
  };

  if (error) {
    return <ErrorBlock error={error} />;
  }

  if (noResults && !hasNextPage) {
    return <div>No results</div>;
  }

  console.log(stats);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>School Name</td>
            <td>Location</td>
            <td>Impact</td>
          </tr>
        </thead>

        <tbody>
          {stats.map(({ node, cursor }) => {
            const { impact, school } = node;

            return (
              <tr key={cursor}>
                <td>{school.name}</td>
                <td>
                  {school.city}, {school.state}
                </td>
                <td>{impact}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot className="form-actions">
          {loading ? (
            <tr>
              <td colSpan="3">
                <Spinner />
              </td>
            </tr>
          ) : null}

          {hasNextPage ? (
            <tr>
              <td colSpan="3">
                <button
                  className="button -tertiary"
                  onClick={handleViewMore}
                  disabled={loading}
                >
                  view more...
                </button>
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
  location: PropTypes.string,
  schoolId: PropTypes.string,
};

ActionStatsTable.defaultProps = {
  location: null,
  schoolId: null,
};

export default ActionStatsTable;
