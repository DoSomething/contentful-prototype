import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import { featureFlag } from '../../../helpers/env';
import { tailwind, query, report } from '../../../helpers';
import GiftCardHandLargeImage from './gift-card-hand-large.svg';
import GiftCardHandSmallImage from './gift-card-hand-small.svg';
import { REFERRAL_USER_QUERY } from '../../pages/ReferralPage/Beta/BetaPage';

import './cta-referral-page-banner.scss';

const CtaReferralPageBanner = ({ campaignId, displayReferralPage }) => {
  if (!displayReferralPage) {
    return null;
  }

  const referralIncentive = featureFlag('refer_friends_incentive');

  const referrerUserId = query('referrer_user_id');

  const { data, loading, error } = useQuery(REFERRAL_USER_QUERY, {
    variables: {
      id: referrerUserId,
    },
    skip: !referrerUserId || !referralIncentive,
  });

  if (loading) {
    return null;
  }

  if (error) {
    report(error);
    console.error(`[CtaReferralPageBanner] ${error}`);
  }

  const referralUserName = get(data, 'user.firstName');

  const referralIncentiveHeader = referralUserName
    ? `You and ${referralUserName} are both entered to win a $10 gift card!`
    : 'Benefits With Friends';
  const referralIncentiveBody = referralUserName
    ? "If you win, we'll email the gift card to you."
    : 'Refer a friend to this campaign, and you’ll *both* enter for a chance to win a $10 gift card!';

  return (
    <div className="p-3" data-testid="cta-referral-page-banner">
      <div className="cta-register-banner md:px-6 pt-3 clearfix">
        <div
          className="cta-register-banner__content p-6 md:pr-0 text-center md:text-left"
          css={css`
            background: url(${GiftCardHandSmallImage});

            @media (min-width: ${tailwind('screens.md')}) {
              background: url(${GiftCardHandLargeImage});
            }
          `}
        >
          <h3 className="text-white">
            {referralIncentive
              ? referralIncentiveHeader
              : 'Get your Friends Involved!'}
          </h3>

          <p className="text-white pb-3">
            {referralIncentive
              ? referralIncentiveBody
              : 'Invite a friend to take action in this cause as well!'}
          </p>

          {referralUserName ? null : (
            <a
              href={`/us/refer-friends?campaign_id=${campaignId}`}
              className="button p-3 -attached"
            >
              Refer A Friend
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

CtaReferralPageBanner.propTypes = {
  campaignId: PropTypes.string.isRequired,
  displayReferralPage: PropTypes.bool,
};

CtaReferralPageBanner.defaultProps = {
  displayReferralPage: false,
};

export default CtaReferralPageBanner;
