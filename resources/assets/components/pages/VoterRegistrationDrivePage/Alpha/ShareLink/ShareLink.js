import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { shareLink } from '../config';
import VotingReasons from './VotingReasons';
import SocialDriveActionContainer from '../../../../actions/SocialDriveAction/SocialDriveActionContainer';

const ShareLink = ({ referrerUserId }) => {
  const [votingReasonsQuery, setVotingReasonsQuery] = useState(null);

  return (
    <div className="grid-wide">
      <SocialDriveActionContainer
        link={`https://vote.dosomething.org/member-drive?voting-options=${votingReasonsQuery}&userId=${referrerUserId}&r=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
        fullWidth
        actionId={shareLink.actionId}
        hidePageViews
      >
        <VotingReasons
          onSelect={selected => setVotingReasonsQuery(selected.join(','))}
        />
      </SocialDriveActionContainer>
    </div>
  );
};

ShareLink.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ShareLink;
