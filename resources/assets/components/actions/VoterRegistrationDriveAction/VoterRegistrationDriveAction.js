import React from 'react';
import PropTypes from 'prop-types';

import QueryOptions from './QueryOptions';
import { PHOENIX_URL } from '../../../constants';
import { getUserId } from '../../../helpers/auth';
import SocialDriveActionContainer from '../SocialDriveAction/SocialDriveActionContainer';

const VoterRegistrationDriveAction = ({ actionId }) => (
  <SocialDriveActionContainer
    actionId={actionId}
    link={`${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${getUserId()}`}
    queryOptions={<QueryOptions />}
    shareCardDescription="Urge your friend to vote based on the causes you care about most. The causes you choose will be mentioned on your custom page."
    shareCardTitle="Share with your friends"
  />
);

VoterRegistrationDriveAction.propTypes = {
  actionId: PropTypes.number.isRequired,
};

export default VoterRegistrationDriveAction;
