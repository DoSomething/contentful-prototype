import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

import { convertOnSignupIntent } from '../../helpers/sixpack';

const SignupButton = (props) => {
  const { campaignActionText, sourceActionText, className, clickedSignUp, experiments, source,
    template, text, trackEvent, trafficSource, legacyCampaignId, convertExperiment } = props;

  // A/B Test: If a user has a traffic source, test different button language!
  let sourceOverride = null;
  if (trafficSource) {
    sourceOverride = get(sourceActionText, trafficSource);

    // @TODO ...
  }

  // In descending priority: button-specific text prop, source-specific override,
  // campaign action text override, or standard "Take Action" copy.
  const buttonText = text || sourceOverride || campaignActionText;

  const convertExperiments = () => {
    Object.keys(experiments).forEach((experiment) => {
      if (convertOnSignupIntent(experiment)) {
        convertExperiment(experiment);
      }
    });
  };

  // Decorate click handler for A/B tests & analytics.
  const onSignup = () => {
    convertExperiments();
    clickedSignUp(legacyCampaignId);
    trackEvent('signup', {
      template,
      legacyCampaignId,
      source,
      sourceData: { text: buttonText },
    });
  };

  return (
    <button className={classnames('button', className)} onClick={onSignup}>{ buttonText }</button>
  );
};

SignupButton.propTypes = {
  text: PropTypes.string,
  campaignActionText: PropTypes.string,
  sourceActionText: PropTypes.string,
  className: PropTypes.string,
  clickedSignUp: PropTypes.func.isRequired,
  convertExperiment: PropTypes.func.isRequired,
  experiments: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  legacyCampaignId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  template: PropTypes.string,
  trafficSource: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
};

SignupButton.defaultProps = {
  text: null,
  campaignActionText: 'Take Action',
  sourceActionText: null,
  className: null,
  template: null,
  trafficSource: null,
};

export default SignupButton;
