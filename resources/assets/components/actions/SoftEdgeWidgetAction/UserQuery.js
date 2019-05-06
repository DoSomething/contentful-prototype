import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

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
  <Query query={ACCOUNT_QUERY} variables={{ userId: props.userId }}>
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

UserQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserQuery;
