import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';

import ClubSelect from './ClubSelect';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import { getUserId, isAuthenticated, useGate } from '../../../helpers/auth';

const USER_CLUB_MUTATION = gql`
  mutation UserClubMutation($userId: String!, $clubId: Int) {
    updateClubId(id: $userId, clubId: $clubId) {
      id
    }

    updateEmailSubscriptionTopic(id: $userId, topic: CLUBS, subscribed: true) {
      id
    }
  }
`;

const CurrentClubForm = () => {
  const [flash, authenticate] = useGate('CurrentClubForm');
  const [clubId, setClubId] = useState();

  const [updateUserClub, { loading }] = useMutation(USER_CLUB_MUTATION, {
    variables: { userId: getUserId(), clubId: flash.clubId },
    refetchQueries: ['UserClubQuery'],
  });

  useEffect(() => {
    if (isAuthenticated() && flash.clubId) {
      updateUserClub();
    }
  }, []);

  return (
    <div className="p-3">
      <strong>Club Name</strong>

      <ClubSelect onChange={setClubId} />

      <PrimaryButton
        className="mt-3 text-lg w-full"
        onClick={() =>
          isAuthenticated()
            ? updateUserClub({
                variables: { clubId },
              })
            : authenticate({ clubId })
        }
        isLoading={loading}
        isDisabled={!clubId || loading}
        text="join club"
      />
    </div>
  );
};

export default CurrentClubForm;
