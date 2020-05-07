import React from 'react';
import PropTypes from 'prop-types';

import { gqlVariables } from './config';
import { isDevEnvironment } from '../../../../helpers';
import VoterRegistrationReferrals from './VoterRegistrationReferrals/VoterRegistrationReferrals';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const AlphaPage = ({ userId }) => {
  const config = isDevEnvironment()
    ? gqlVariables.dev
    : gqlVariables.production;

  return (
    <div
      className="base-12-grid clear-both py-3 md:py-6"
      data-test="alpha-voter-registration-drive-page"
    >
      <VoterRegistrationReferrals referrerUserId={userId} />
      <ContentfulEntryLoader
        id={config.shareLink.contentBlockId}
        className="grid-wide clearfix wrapper pb-3"
      />
      <div className="grid-wide">
        <SocialDriveActionContainer
          link={`https://vote.dosomething.org/member-drive?userId=${userId}&r=user:${userId},source:web,source_details:onlinedrivereferral,referral=true`}
          actionId={config.shareLink.actionId}
          hidePageViews
        />
      </div>
    </div>
  );
};

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
