import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { NetworkStatus } from '../constants';
import Spinner from './artifacts/Spinner/Spinner';
import ErrorBlock from './blocks/ErrorBlock/ErrorBlock';

/**
 * Fetch results via GraphQL using a useQuery hook.
 */
const PaginatedQuery = ({ query, queryName, variables, count, children }) => {
  const { error, loading, data, fetchMore, networkStatus } = useQuery(query, {
    variables: {
      ...variables,
      count,
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });

  // On initial load, just display a loading spinner.
  if (networkStatus === NetworkStatus.LOADING) {
    return <Spinner className="flex justify-center p-6" />;
  }

  if (error) {
    console.error(`${queryName} ERROR: ${error}`);
    return <ErrorBlock error={error} />;
  }

  return children({
    result: data[queryName],
    fetching: networkStatus === NetworkStatus.FETCH_MORE,
    fetchMore: () =>
      fetchMore({
        variables: {
          // The value in `variables.page` doesn't get updated here on
          // subsequent clicks, so we have to recalculate each time...
          page:
            // Use ceil to force an integer in case we have less results data than the count!
            Math.ceil(data[queryName].length / count) + 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult[queryName]) {
            return previousResult;
          }

          return {
            ...previousResult,
            [queryName]: [
              ...previousResult[queryName],
              ...fetchMoreResult[queryName],
            ],
          };
        },
      }),
  });
};

PaginatedQuery.propTypes = {
  query: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  queryName: PropTypes.string.isRequired,
  variables: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  count: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};

PaginatedQuery.defaultProps = {
  variables: {},
};

export default PaginatedQuery;
