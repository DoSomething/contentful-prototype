import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Button from '../utilities/Button/Button';

const SignupButton = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    className,
    clickedSignupAction,
    disableSignup,
    source,
    sourceActionText,
    template,
    text,
    trafficSource,
    campaignId,
    campaignContentfulId,
  } = props;

  // Decorate click handler for A/B tests & analytics.
  const onSignup = buttonText => {
    const details = { campaignContentfulId };

    // Set affiliate opt in field if user has opted in.
    if (affiliateMessagingOptIn) {
      details.affiliateOptIn = true;
    }

    clickedSignupAction(campaignId, {
      body: { details: JSON.stringify(details) },
      analytics: {
        campaignContentfulId,
        source,
        sourceData: { text: buttonText },
        template,
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
    <Button className={className} onClick={() => onSignup(buttonCopy)}>
      {buttonCopy}
    </Button>
  );
};

SignupButton.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool.isRequired,
  campaignActionText: PropTypes.string,
  className: PropTypes.string,
  clickedSignupAction: PropTypes.func.isRequired,
  disableSignup: PropTypes.bool,
  campaignId: PropTypes.string.isRequired,
  campaignContentfulId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  sourceActionText: PropTypes.objectOf(PropTypes.string),
  template: PropTypes.string,
  text: PropTypes.string,
  trafficSource: PropTypes.string,
};

SignupButton.defaultProps = {
  campaignActionText: 'Take Action',
  className: null,
  disableSignup: false,
  sourceActionText: null,
  template: null,
  text: null,
  trafficSource: null,
};

export default SignupButton;
