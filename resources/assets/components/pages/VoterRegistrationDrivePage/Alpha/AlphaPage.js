import React from 'react';
import PropTypes from 'prop-types';

import { gqlVariables } from './config';
import { isDevEnvironment } from '../../../../helpers';
import ShareLink from './ShareLink/ShareLink';
import VoterRegistrationReferrals from './VoterRegistrationReferrals/VoterRegistrationReferrals';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const AlphaPage = ({ userId }) => {
  const config = isDevEnvironment()
    ? gqlVariables.development
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
      <ShareLink referrerUserId={userId} actionId={config.shareLink.actionId} />
    </div>
  );
};

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
