import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import Account from './Account';

const ACCOUNT_QUERY = gql`
  query AccountQuery($userId: String!) {
    user(id: $userId) {
      id
      firstName
      lastName
      mobile
      birthdate
      email
      emailSubscriptionTopics
      hasBadgesFlag: hasFeatureFlag(feature: "badges")
    }
  }
`;

const AccountQuery = ({ userId }) => (
  <Query query={ACCOUNT_QUERY} queryName="user" variables={{ userId }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div className="spinner -centered" />;
      }
      if (error) {
        return <ErrorBlock />;
      }

      return <Account {...data} userId={userId} />;
    }}
  </Query>
);

AccountQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AccountQuery;
