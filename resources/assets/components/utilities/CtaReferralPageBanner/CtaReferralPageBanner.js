import React from 'react';
import PropTypes from 'prop-types';

import { featureFlag } from '../../../helpers';

import './cta-referral-page-banner.scss';

const CtaReferralPageBanner = ({ campaignId }) => (
  <React.Fragment>
    {featureFlag('referral_campaign_ids', []).includes(campaignId) ? (
      <div className="p-3">
        <div className="cta-register-banner md:px-6 pt-3 clearfix">
          <div className="cta-register-banner__content p-6 md:pr-0 text-center md:text-left">
            <h3 className="text-white">Benefits With Friends</h3>
            <p className="text-white pb-3">
              Refer a friend to this campaign, and you’ll *both* increase your
              chances of winning the campaign scholarship!
            </p>
            <a
              href={`/us/refer-friends?campaign_id=${campaignId}`}
              className="button p-3 -attached"
            >
              Refer A Friend
            </a>
          </div>
        </div>
      </div>
    ) : null}
  </React.Fragment>
);

CtaReferralPageBanner.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default CtaReferralPageBanner;
