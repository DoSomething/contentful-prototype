import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { NetworkStatus } from '../constants';
import ErrorBlock from './blocks/ErrorBlock/ErrorBlock';
import Spinner from './artifacts/Spinner/Spinner';

/**
 * Fetch results via GraphQL using a query component.
 */
const PaginatedQuery = ({ query, queryName, variables, count, children }) => (
  <Query
    query={query}
    variables={{ ...variables, count, page: 1 }}
    notifyOnNetworkStatusChange
  >
    {result => {
      // On initial load, just display a loading spinner.
      if (result.networkStatus === NetworkStatus.LOADING) {
        return <Spinner className="flex justify-center p-6" />;
      }

      if (result.error) {
        console.error(`${queryName} ERROR: ${result.error}`);
        return <ErrorBlock error={result.error} />;
      }

      return children({
        result: result.data[queryName],
        fetching: result.networkStatus === NetworkStatus.FETCH_MORE,
        fetchMore: () =>
          result.fetchMore({
            variables: {
              // The value in `variables.page` doesn't get updated here on
              // subsequent clicks, so we have to recalculate each time...
              page:
                // Use ceil to force an integer in case we have less results data than the count!
                Math.ceil(
                  result.data[queryName].length / result.variables.count,
                ) + 1,
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
    }}
  </Query>
);

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
