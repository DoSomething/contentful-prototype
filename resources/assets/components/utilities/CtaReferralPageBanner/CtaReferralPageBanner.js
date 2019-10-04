import React from 'react';
import PropTypes from 'prop-types';

import './cta-referral-page-banner.scss';

// For now, only display Referral Pages for certain campaigns.
// @see https://www.pivotaltracker.com/n/projects/2019429/stories/168489148/comments/206819678
const REFERRAL_CAMPAIGN_IDS = [
  '7',
  '2932',
  '3271',
  '3302',
  '3590',
  '7951',
  // Remove before comitting
  '9001',
  '9026',
  '9027',
  '9030',
  '9031',
  '9032',
];

const CtaReferralPageBanner = ({ campaignId }) => (
  <React.Fragment>
    {REFERRAL_CAMPAIGN_IDS.includes(campaignId) ? (
      <div className="p-4">
        <div className="cta-register-banner p-4 clearfix">
          <div className="p-4">
            <h3 className="text-white">Benefits With Friends</h3>
            <p className="text-white padding-bottom-md">
              Refer a friend to this campaign, and you’ll *both* earn a $5 gift
              card!
            </p>
            <a
              href={`/us/refer-friends?campaign_id=${campaignId}`}
              className="button padded -attached"
            >
              Refer A Friend
            </a>
          </div>
        </div>
      </div>
    ) : null}
    ;
  </React.Fragment>
);

CtaReferralPageBanner.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default CtaReferralPageBanner;
