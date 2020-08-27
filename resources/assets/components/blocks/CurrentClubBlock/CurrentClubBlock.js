import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { getUserId } from '../../../helpers/auth';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Spinner from '../../artifacts/Spinner/Spinner';

const USER_CLUB_QUERY = gql`
  query UserClubQuery($userId: String!) {
    user(id: $userId) {
      id
      clubId
      club {
        name
      }
    }
  }
`;

const CurrentClubBlock = () => {
  const userId = getUserId();

  const { loading, error, data } = useQuery(USER_CLUB_QUERY, {
    variables: { userId },
    skip: !userId,
  });

  if (loading) {
    return <Spinner className="flex justify-center p-3 pb-8" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const club = get(data, 'user.club');

  return <div>{club ? club.name : 'Club Form'}</div>;
};

export default CurrentClubBlock;
