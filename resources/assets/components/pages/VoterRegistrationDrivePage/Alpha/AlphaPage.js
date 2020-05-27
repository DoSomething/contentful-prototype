import React from 'react';
import PropTypes from 'prop-types';

import { gqlVariables } from './config';
import { PHOENIX_URL } from '../../../../constants';
import { featureFlag, isDevEnvironment } from '../../../../helpers';
import VotingReasonsQueryOptions from './VotingReasonsQueryOptions';
import ContentfulEntryLoader from '../../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';
import VoterRegistrationReferralsBlock from '../../../blocks/VoterRegistrationReferralsBlock/VoterRegistrationReferralsBlock';

const AlphaPage = ({ userId }) => {
  const config = isDevEnvironment()
    ? gqlVariables.development
    : gqlVariables.production;
  const betaPageEnabled = featureFlag('voter_reg_beta_page');

  return (
    <div
      className="base-12-grid clear-both py-3 md:py-6"
      data-test="alpha-voter-registration-drive-page"
    >
      <VoterRegistrationReferralsBlock referrerUserId={userId} />
      <ContentfulEntryLoader
        id={config.shareLink.contentBlockId}
        className="grid-wide clearfix wrapper pb-3"
      />
      <div className="grid-wide">
        <SocialDriveActionContainer
          actionId={config.shareLink.actionId}
          link={
            betaPageEnabled
              ? `${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${userId}`
              : `https://vote.dosomething.org/member-drive?userId=${userId}&r=user:${userId},source:web,source_details:onlinedrivereferral,referral=true`
          }
          queryOptions={betaPageEnabled ? <VotingReasonsQueryOptions /> : null}
          shareCardDescription={
            betaPageEnabled
              ? 'Urge your friend to vote based on the causes you care about most. The causes you choose will be mentioned on your custom page.'
              : null
          }
          shareCardTitle={
            betaPageEnabled ? 'Share with your friends' : undefined
          }
        />
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
