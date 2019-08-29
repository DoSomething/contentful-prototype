import React from 'react';
import PropTypes from 'prop-types';

const CtaReferralPageBanner = ({ campaignId }) => (
  <div>
    <h3>Benefits With Friends</h3>
    <p>
      Refer a friend to this campaign, and you’ll *both* earn a $5 gift card!
    </p>
    <a href={`/us/refer-friends?campaign_id=${campaignId}`}>Refer A Friend</a>
  </div>
);

CtaReferralPageBanner.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default CtaReferralPageBanner;
