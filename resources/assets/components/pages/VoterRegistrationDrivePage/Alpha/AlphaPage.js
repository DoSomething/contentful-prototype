import React from 'react';
import PropTypes from 'prop-types';

import { development, production } from './config';
import { isDevEnvironment } from '../../../../helpers';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import VoterRegistrationDriveAction from '../../../actions/VoterRegistrationDriveAction/VoterRegistrationDriveAction';
import VoterRegistrationReferralsBlock from '../../../blocks/VoterRegistrationReferralsBlock/VoterRegistrationReferralsBlock';

const AlphaPage = ({ userId }) => {
  const config = isDevEnvironment() ? development : production;

  return (
    <div
      className="base-12-grid clear-both py-3 md:py-6"
      data-test="alpha-voter-registration-drive-page"
    >
      <VoterRegistrationReferralsBlock />
      <ContentfulEntryLoader
        id={config.shareLink.contentBlockId}
        className="grid-wide clearfix wrapper pb-3"
      />
      <div className="grid-wide">
        <VoterRegistrationDriveAction actionId={config.shareLink.actionId} />
      </div>
      <ContentfulEntryLoader
        id={config.faq.contentBlockId}
        className="grid-wide clearfix wrapper pb-3"
      />
    </div>
  );
};

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
