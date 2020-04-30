import React from 'react';
import PropTypes from 'prop-types';

import { shareLink } from './config';
import { isDevEnvironment } from '../../../../helpers';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const ShareLink = ({ referrerUserId }) => (
  <div className="grid-wide">
    <SocialDriveActionContainer
      link={`https://vote.dosomething.org/member-drive?userId=${referrerUserId}&r=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
      fullWidth
      actionId={shareLink.actionId}
    />
  </div>
);

ShareLink.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ShareLink;
