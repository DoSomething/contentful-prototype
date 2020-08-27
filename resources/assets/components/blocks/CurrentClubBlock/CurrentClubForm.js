import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import ClubSelect from './ClubSelect';
import { getUserId } from '../../../helpers/auth';
import PrimaryButton from '../../utilities/Button/PrimaryButton';

const USER_CLUB_MUTATION = gql`
  mutation UserClubMutation($userId: String!, $clubId: Int) {
    updateClubId(id: $userId, clubId: $clubId) {
      id
      club {
        id
      }
    }

    updateEmailSubscriptionTopic(id: $userId, topic: CLUBS, subscribed: true) {
      id
      emailSubscriptionTopics
      emailSubscriptionStatus
    }
  }
`;

const CurrentClubForm = () => {
  const [club, setClub] = useState(null);
  const [updateUserClub, { loading }] = useMutation(USER_CLUB_MUTATION, {
    variables: { userId: getUserId() },
  });

  return (
    <div className="p-3">
      <strong>Club Name</strong>

      <ClubSelect onChange={selected => setClub(selected)} />

      <PrimaryButton
        className="mt-3 text-lg w-full"
        onClick={() => updateUserClub({ variables: { clubId: club.id } })}
        isLoading={loading}
        isDisabled={!club || loading}
        text="join club"
      />
    </div>
  );
};

export default CurrentClubForm;
