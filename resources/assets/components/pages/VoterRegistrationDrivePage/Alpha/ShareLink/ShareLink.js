import React from 'react';
import PropTypes from 'prop-types';

import { featureFlag } from '../../../../../helpers';
import { PHOENIX_URL } from '../../../../../constants';
import VotingReasonsQueryOptions from './VotingReasonsQueryOptions';
import SocialDriveActionContainer from '../../../../actions/SocialDriveAction/SocialDriveActionContainer';

const ShareLink = ({ actionId, referrerUserId }) => {
  const betaPageEnabled = featureFlag('voter_reg_beta_page');

  return (
    <div className="grid-wide">
      <SocialDriveActionContainer
        actionId={actionId}
        link={
          betaPageEnabled
            ? `${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${referrerUserId}`
            : `https://vote.dosomething.org/member-drive?userId=${referrerUserId}&r=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`
        }
        queryOptions={betaPageEnabled ? <VotingReasonsQueryOptions /> : null}
        shareCardDescription={
          betaPageEnabled
            ? 'Urge your friend to vote based on the causes you care about most.'
            : null
        }
        shareCardTitle={betaPageEnabled ? 'Share with your friends' : null}
      />
    </div>
  );
};

ShareLink.propTypes = {
  actionId: PropTypes.number.isRequired,
  referrerUserId: PropTypes.string.isRequired,
};

export default ShareLink;
