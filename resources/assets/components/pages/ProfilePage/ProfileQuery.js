import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import AccountNavigation from './AccountNavigation';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import ProfileRoute from './ProfileRoute';

const PROFILE_QUERY = gql`
  query ProfileQuery($userId: String!) {
    user(id: $userId) {
      firstName
      lastName
      mobile
      birthdate
      email
    }
  }
`;

const ProfileQuery = ({ userId }) => (
  <Query query={PROFILE_QUERY} queryName="user" variables={{ userId }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div className="spinner -centered" />;
      }
      if (error) {
        return <ErrorBlock />;
      }

      return <ProfileRoute {...data} userId={userId} />;
    }}
  </Query>
);

ProfileQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileQuery;
