import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ErrorPage from '../../ErrorPage';
import NotFoundPage from '../../NotFoundPage';
import Loader from '../../../utilities/Loader';
import { getUserId } from '../../../../helpers/auth';
import Placeholder from '../../../utilities/Placeholder';

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
    }
  }
`;

const AccountQuery = () => {
  const userId = getUserId();

  const { loading, error, data } = useQuery(ACCOUNT_QUERY, {
    variables: { userId },
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!data.user) {
    return <NotFoundPage />;
  }

  const Account = Loader(import('./Account'));
  return <Account {...data} userId={userId} />;
};

export default AccountQuery;
