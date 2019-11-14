import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery } from 'react-apollo';

import { NetworkStatus } from '../constants';
import ErrorBlock from './blocks/ErrorBlock/ErrorBlock';

/**
 * Fetch results via GraphQL using a query component.
 */
const Query = ({ query, variables, children, hideSpinner }) => (
  <ApolloQuery query={query} variables={variables} notifyOnNetworkStatusChange>
    {result => {
      // On initial load, just display a loading spinner.
      if (result.networkStatus === NetworkStatus.LOADING) {
        return hideSpinner ? null : <div className="spinner -centered p-6" />;
      }

      if (result.error) {
        return <ErrorBlock />;
      }

      return children(result.data);
    }}
  </ApolloQuery>
);

Query.propTypes = {
  query: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  variables: PropTypes.object,
  hideSpinner: PropTypes.bool,
};

Query.defaultProps = {
  variables: {},
  hideSpinner: false,
};

export default Query;
