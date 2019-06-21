import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import ErrorBlock from './ErrorBlock/ErrorBlock';
import { NetworkStatus } from '../constants';

/**
 * Fetch results via GraphQL using a query component.
 */
const QueryResults = ({ query, queryName, variables, children }) => (
  <Query query={query} variables={variables} notifyOnNetworkStatusChange>
    {result => {
      // On initial load, just display a loading spinner.
      if (result.networkStatus === NetworkStatus.LOADING) {
        return <div className="spinner -centered" />;
      }

      if (result.error) {
        console.error(`${queryName} ERROR: ${result.error}`);
        return <ErrorBlock />;
      }

      return children(result);
    }}
  </Query>
);

QueryResults.propTypes = {
  query: PropTypes.object.isRequired,
  queryName: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  variables: PropTypes.object,
};

QueryResults.defaultProps = {
  variables: {},
};

export default QueryResults;
