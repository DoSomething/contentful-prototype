import React from 'react';
import PropTypes from 'prop-types';

import VotingReasons from './VotingReasons';
import SocialDriveActionContainer from '../../../../actions/SocialDriveAction/SocialDriveActionContainer';

const ShareLink = ({ actionId, referrerUserId }) => {
  return (
    <div className="grid-wide">
      <SocialDriveActionContainer
        actionId={actionId}
        link={`https://vote.dosomething.org/member-drive?userId=${referrerUserId}&r=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
        queryOptions={<VotingReasons />}
      />
    </div>
  );
};

ShareLink.propTypes = {
  actionId: PropTypes.number.isRequired,
  referrerUserId: PropTypes.string.isRequired,
};

export default ShareLink;
