import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import SoftEdgeWidgetAction from './SoftEdgeWidgetAction';

const ACCOUNT_QUERY = gql`
  query AccountQuery($userId: String!) {
    user(id: $userId) {
      id
      firstName
      lastName
      mobile
      email
      addrStreet1
      addrCity
      addrState
      addrZip
    }
  }
`;

const UserQuery = props => (
  <Query
    query={ACCOUNT_QUERY}
    queryName="user"
    variables={{ userId: props.userId }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <div className="spinner -centered" />;
      }

      if (error) {
        return <ErrorBlock />;
      }

      return <SoftEdgeWidgetAction {...data} {...props} />;
    }}
  </Query>
);

export default UserQuery;
