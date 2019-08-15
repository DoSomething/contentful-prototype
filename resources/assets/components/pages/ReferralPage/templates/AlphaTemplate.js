import React from 'react';
import PropTypes from 'prop-types';

import { PHOENIX_URL } from '../../../../constants';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const AlphaTemplate = props => {
  const { primaryCampaignId, userId } = props;
  let url = `${PHOENIX_URL}/us/join?user_id=${userId}`;

  if (primaryCampaignId) {
    url = `${url}&campaign_id=${primaryCampaignId}`;
  }

  return (
    <div className="main general-page">
      <div className="margin-vertical">
        <div className="general-page__heading text-center">
          <h1 className="general-page__title caps-lock">Want free stuff?</h1>
        </div>
        <div className="margin-vertical">
          <SocialDriveActionContainer
            shareCardDescription="When you and a friend complete this campaign, you’ll both earn a $5 gift card! The more friends you refer, the more gift cards you earn. (Psst...there’s no limit on how many you can refer!)"
            shareCardTitle="Refer A Friend"
            link={url}
            showPageViews={false}
          />
        </div>
      </div>
    </div>
  );
};

AlphaTemplate.propTypes = {
  primaryCampaignId: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

AlphaTemplate.defaultProps = {
  primaryCampaignId: null,
};

export default AlphaTemplate;
