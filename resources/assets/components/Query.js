import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery } from 'react-apollo';

import ErrorBlock from './ErrorBlock/ErrorBlock';
import { NetworkStatus } from '../constants';

/**
 * Fetch results via GraphQL using a query component.
 */
const Query = ({ query, queryName, variables, children }) => (
  <ApolloQuery query={query} variables={variables} notifyOnNetworkStatusChange>
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
  </ApolloQuery>
);

Query.propTypes = {
  query: PropTypes.object.isRequired,
  queryName: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  variables: PropTypes.object,
};

Query.defaultProps = {
  variables: {},
};

export default Query;
