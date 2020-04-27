import React from 'react';
import PropTypes from 'prop-types';

import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const ShareLink = ({ referrerUserId }) => (
  <div className="grid-wide">
    <SocialDriveActionContainer
      link={`https://vote.dosomething.org/member-drive?userId=${referrerUserId}&r=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
      fullWidth
    />
  </div>
);

ShareLink.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ShareLink;
