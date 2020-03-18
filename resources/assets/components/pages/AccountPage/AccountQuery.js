import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Loader from '../../utilities/Loader';
import Query from '../../Query';

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

const AccountQuery = ({ userId }) => {
  const Account = Loader(import('./Account'));
  return (
    <Query query={ACCOUNT_QUERY} variables={{ userId }}>
      {result => <Account {...result} userId={userId} />}
    </Query>
  );
};

AccountQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AccountQuery;
