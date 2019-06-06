import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { query, withoutNulls } from '../../helpers';
import Button from '../utilities/Button/Button';

const SignupButton = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    campaignId,
    campaignTitle,
    className,
    disableSignup,
    referrerId,
    sourceActionText,
    storeCampaignSignup,
    text,
    trafficSource,
  } = props;

  // Decorate click handler for A/B tests & analytics.
  const handleSignup = () => {
    // @TODO: Do we need this if we store refferer_id on source_details?
    const details = { campaignContentfulId: referrerId };

    // Set affiliate opt in field if user has opted in.
    if (affiliateMessagingOptIn) {
      details.affiliateOptIn = true;
    }

    storeCampaignSignup(campaignId, {
      body: {
        details: JSON.stringify(details),
        source_details: JSON.stringify(
          withoutNulls({
            referrer_id: referrerId,
            utm_source: query('utm_source'),
            utm_medium: query('utm_medium'),
            utm_campaign: query('utm_campaign'),
          }),
        ),
      },
      analytics: {
        context: {
          campaignContentfulId: referrerId,
        },
        label: campaignTitle,
        target: 'button',
      },
    });
  };

  // Have signups been disabled for this campaign?
  if (disableSignup) {
    return null;
  }

  // If a user has a traffic source w/ an override, try it!
  const sourceOverride = get(sourceActionText, trafficSource);
  const buttonCopy = text || sourceOverride || campaignActionText;

  return (
    <Button className={className} onClick={handleSignup}>
      {buttonCopy}
    </Button>
  );
};

SignupButton.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool.isRequired,
  campaignActionText: PropTypes.string,
  referrerId: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  campaignTitle: PropTypes.string,
  className: PropTypes.string,
  disableSignup: PropTypes.bool,
  sourceActionText: PropTypes.objectOf(PropTypes.string),
  storeCampaignSignup: PropTypes.func.isRequired,
  text: PropTypes.string,
  trafficSource: PropTypes.string,
};

SignupButton.defaultProps = {
  campaignActionText: 'Take Action',
  campaignTitle: null,
  className: null,
  disableSignup: false,
  sourceActionText: null,
  text: null,
  trafficSource: null,
};

export default SignupButton;
