import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Button from '../utilities/Button/Button';

const SignupButton = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    campaignContentfulId,
    campaignId,
    campaignTitle,
    className,
    disableSignup,
    sourceActionText,
    storeCampaignSignup,
    text,
    trafficSource,
  } = props;

  // Decorate click handler for A/B tests & analytics.
  const onSignup = () => {
    const details = { campaignContentfulId };

    // Set affiliate opt in field if user has opted in.
    if (affiliateMessagingOptIn) {
      details.affiliateOptIn = true;
    }

    storeCampaignSignup(campaignId, {
      body: { details: JSON.stringify(details) },
      analytics: {
        target: 'button',
        context: {
          campaignContentfulId,
        },
        label: campaignTitle,
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
    <Button className={className} onClick={() => onSignup()}>
      {buttonCopy}
    </Button>
  );
};

SignupButton.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool.isRequired,
  campaignActionText: PropTypes.string,
  campaignContentfulId: PropTypes.string.isRequired,
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
