import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import MoneyHandLargeImage from './money-hand-large.svg';
import MoneyHandSmallImage from './money-hand-small.svg';
import { featureFlag, tailwind } from '../../../helpers';
import GiftCardHandLargeImage from './gift-card-hand-large.svg';
import GiftCardHandSmallImage from './gift-card-hand-small.svg';

import './cta-referral-page-banner.scss';

const CtaReferralPageBanner = ({ campaignId, displayReferralPage }) => (
  <React.Fragment>
    {displayReferralPage ? (
      <div className="p-3" data-testid="cta-referral-page-banner">
        <div className="cta-register-banner md:px-6 pt-3 clearfix">
          <div
            className="cta-register-banner__content p-6 md:pr-0 text-center md:text-left"
            css={css`
              background: url(${featureFlag('refer_friends_v2')
                ? GiftCardHandSmallImage
                : MoneyHandSmallImage});

              @media (min-width: ${tailwind('screens.md')}) {
                background: url(${featureFlag('refer_friends_v2')
                  ? GiftCardHandLargeImage
                  : MoneyHandLargeImage});
              }
            `}
          >
            <h3 className="text-white">
              {featureFlag('refer_friends_v2')
                ? 'Get your Friends Involved!'
                : 'Benefits With Friends'}
            </h3>

            <p className="text-white pb-3">
              {featureFlag('refer_friends_v2')
                ? 'Invite a friend to take action in this cause as well!'
                : 'Refer a friend to this campaign, and you’ll *both* increase your chances of winning the campaign scholarship!'}
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
  displayReferralPage: PropTypes.bool,
};

CtaReferralPageBanner.defaultProps = {
  displayReferralPage: false,
};

export default CtaReferralPageBanner;
