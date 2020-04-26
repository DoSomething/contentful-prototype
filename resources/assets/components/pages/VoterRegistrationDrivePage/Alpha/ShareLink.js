import React from 'react';
import PropTypes from 'prop-types';

import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const ShareLink = ({ referrerUserId }) => (
  <SocialDriveActionContainer
    link={`https://vote.dosomething.org/member-drive?userId=${referrerUserId}&r=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
    fullWidth
    className="grid-wide"
  />
);

ShareLink.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ShareLink;
