import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import AccountNavigation from './AccountNavigation';

const ACCOUNT_QUERY = gql`
  query AccountQuery($userId: String!) {
    user(id: $userId) {
      firstName
      lastName
      mobile
      birthdate
      email
    }
  }
`;

const AccountQuery = ({ userId }) => (
  <Query query={ACCOUNT_QUERY} queryName="user" variables={{ userId }}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...';
      }
      if (error || !userId) {
        console.log('must be signed in!');
        return `Error! ${error.message}`;
      }
      return <AccountNavigation {...data} />;
    }}
  </Query>
);

AccountQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AccountQuery;
