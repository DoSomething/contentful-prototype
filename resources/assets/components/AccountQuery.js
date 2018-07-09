import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ProfileNavigation from './pages/ProfilePage/ProfileNavigation';
// import ProfilePage from './pages/ProfilePage/ProfilePage';
// import ErrorBlock from './ErrorBlock/ErrorBlock';
// import { NetworkStatus } from '../constants';

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
      console.log(data);
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <ProfileNavigation {...data} />

          <h1> {data.user.firstName}</h1>
          <h1> {data.user.lastName}</h1>
          <h2> {data.user.mobile} </h2>
          <h2> {data.user.birthdate} </h2>
          <h2> {data.user.email} </h2>
        </div>
      );
    }}
  </Query>
);

AccountQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AccountQuery;
