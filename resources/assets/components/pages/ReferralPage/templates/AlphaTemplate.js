import React from 'react';
import PropTypes from 'prop-types';

import { PHOENIX_URL } from '../../../../constants';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const AlphaTemplate = props => {
  const { firstName, primaryCampaignId, userId } = props;

  let url = `${PHOENIX_URL}/us/join?user_id=${userId}`;
  if (primaryCampaignId) {
    url = `${url}&campaign_id=${primaryCampaignId}`;
  }

  return (
    <React.Fragment>
      <SocialDriveActionContainer
        shareCardDescription="When you and a friend complete this campaign, you’ll both earn a $5 gift card! The more friends you refer, the more gift cards you earn. (Psst...there’s no limit on how many you can refer!)"
        shareCardTitle="Refer A Friend"
        link={url}
        showPageViews={false}
      />
      <h3>
        <a href={url}>Check Out Your Referral Page</a>
      </h3>
      <p>
        Welcome to {firstName}’s refer a friend page. Do something, get
        something...
      </p>
    </React.Fragment>
  );
};

AlphaTemplate.propTypes = {
  firstName: PropTypes.string.isRequired,
  primaryCampaignId: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

AlphaTemplate.defaultProps = {
  primaryCampaignId: null,
};

export default AlphaTemplate;
