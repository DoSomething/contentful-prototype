import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import ProfilePage from './ProfilePage';

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

      return <ProfilePage {...data} userId={userId} />;
    }}
  </Query>
);

ProfileQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileQuery;
