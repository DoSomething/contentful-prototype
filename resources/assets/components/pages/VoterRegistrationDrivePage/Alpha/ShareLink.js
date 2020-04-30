import React from 'react';
import PropTypes from 'prop-types';

import { shareLink } from './config';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const contentBlock = (
  <ContentfulEntryLoader
    id={shareLink.contentBlockId}
    className="grid-wide clearfix wrapper pb-3"
  />
);

const ShareLink = ({ referrerUserId }) => (
  <>
    {contentBlock}
    <div className="grid-wide">
      <SocialDriveActionContainer
        link={`https://vote.dosomething.org/member-drive?userId=${referrerUserId}&r=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`}
        fullWidth
        actionId={shareLink.actionId}
        hidePageViews
      />
    </div>
  </>
);

ShareLink.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ShareLink;
