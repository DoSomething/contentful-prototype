import React from 'react';
import PropTypes from 'prop-types';

import { faq, shareLink } from './config';
import ReferralsList from './ReferralsList/ReferralsList';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const AlphaPage = ({ userId }) => (
  <div
    className="base-12-grid clear-both py-3 md:py-6"
    data-test="alpha-voter-registration-drive-page"
  >
    <ReferralsList referrerUserId={userId} />
    <ContentfulEntryLoader
      id={shareLink.contentBlockId}
      className="grid-wide clearfix wrapper pb-3"
    />
    <div className="grid-wide">
      <SocialDriveActionContainer
        link={`https://vote.dosomething.org/member-drive?userId=${userId}&r=user:${userId},source:web,source_details:onlinedrivereferral,referral=true`}
        fullWidth
        actionId={shareLink.actionId}
        hidePageViews
      />
    </div>
    <ContentfulEntryLoader
      id={faq.contentBlockId}
      className="grid-wide clearfix wrapper pb-3"
    />
  </div>
);

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
