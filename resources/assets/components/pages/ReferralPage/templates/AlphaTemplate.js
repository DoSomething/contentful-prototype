import React from 'react';
import PropTypes from 'prop-types';

const AlphaTemplate = props => {
  const { firstName, primaryCampaignId, userId } = props;
  // @TODO: This URL should be shortened via Bertly.
  let url = `/us/join?user_id=${userId}`;
  if (primaryCampaignId) {
    url = `${url}&campaign_id=${primaryCampaignId}`;
  }

  return (
    <React.Fragment>
      <h2>Refer A Friend</h2>
      <p>
        When you and a friend complete this campaign, you’ll both earn a $5 gift
        card! The more friends you refer, the more gift cards you earn.
        (Psst...there’s no limit on how many you can refer!)
      </p>
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
