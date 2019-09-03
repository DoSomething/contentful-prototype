import React from 'react';
import PropTypes from 'prop-types';

import './cta-referral-page-banner.scss';

const CtaReferralPageBanner = props => (
  <div className="p-4">
    <div className="cta-register-banner p-4">
      <div>
        <h3 className="color-white">Benefits With Friends</h3>
        <p className="color-white padding-bottom-md">
          Refer a friend to this campaign, and you’ll *both* earn a $5 gift
          card!
        </p>
        <a
          href={`/us/refer-friends?campaign_id=${props.campaignId}`}
          className="button padded share -blue"
        >
          Refer A Friend
        </a>
      </div>
    </div>
  </div>
);

CtaReferralPageBanner.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default CtaReferralPageBanner;
