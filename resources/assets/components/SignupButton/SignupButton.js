import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Button from '../Button/Button';
import { convertOnSignupIntent } from '../../helpers/sixpack';

const SignupButton = props => {
  const {
    campaignActionText,
    className,
    clickedSignUp,
    disableSignup,
    experiments,
    source,
    sourceActionText,
    template,
    text,
    trackEvent,
    trafficSource,
    legacyCampaignId,
    convertExperiment,
  } = props;

  const convertExperiments = () => {
    Object.keys(experiments).forEach(experiment => {
      if (convertOnSignupIntent(experiment)) {
        convertExperiment(experiment);
      }
    });
  };

  // Decorate click handler for A/B tests & analytics.
  const onSignup = buttonText => {
    convertExperiments();
    clickedSignUp(legacyCampaignId);
    trackEvent('signup', {
      template,
      legacyCampaignId,
      source,
      sourceData: { text: buttonText },
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
  campaignActionText: PropTypes.string,
  className: PropTypes.string,
  clickedSignUp: PropTypes.func.isRequired,
  disableSignup: PropTypes.bool,
  convertExperiment: PropTypes.func.isRequired,
  experiments: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  legacyCampaignId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  sourceActionText: PropTypes.objectOf(PropTypes.string),
  template: PropTypes.string,
  text: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
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
