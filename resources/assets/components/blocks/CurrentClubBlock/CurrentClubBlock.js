import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Card from '../../utilities/Card/Card';
import CurrentClubForm from './CurrentClubForm';
import { getUserId } from '../../../helpers/auth';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Spinner from '../../artifacts/Spinner/Spinner';

const USER_CLUB_QUERY = gql`
  query UserClubQuery($userId: String!) {
    user(id: $userId) {
      id
      club {
        id
        name
        city
        location
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
  const { name, city, location } = club || {};

  return (
    <Card className="rounded bordered" title="Your club">
      <div className="p-3">
        {club ? (
          <div data-testid="current-club">
            <p className="pt-2 pb-3">
              Hooray! You’re officially a member of your local DoSomething Club:
            </p>

            <div className="border border-solid border-gray-400 rounded p-3">
              <p className="font-bold" data-testid="current-club-name">
                {name}
              </p>

              {location ? (
                <span className="uppercase text-sm text-gray-600 font-bold">
                  {city}, {location.substring(3)}
                </span>
              ) : null}
            </div>

            <p className="text-sm text-gray-500 pt-3">
              Need help? Email Maddy at maddy@dosomething.org
            </p>
          </div>
        ) : (
          <CurrentClubForm />
        )}
      </div>
    </Card>
  );
};

export default CurrentClubBlock;
