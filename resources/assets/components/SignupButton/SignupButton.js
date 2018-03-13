import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Button from '../Button/Button';
import ExperimentContainer from '../Experiment';
import { convertOnSignupIntent } from '../../helpers/sixpack';

const SignupButton = (props) => {
  const { campaignActionText, sourceActionText, className, clickedSignUp, experiments, source,
    template, text, trackEvent, trafficSource, legacyCampaignId, convertExperiment } = props;

  const convertExperiments = () => {
    Object.keys(experiments).forEach((experiment) => {
      if (convertOnSignupIntent(experiment)) {
        convertExperiment(experiment);
      }
    });
  };

  // Decorate click handler for A/B tests & analytics.
  const onSignup = (buttonText) => {
    convertExperiments();
    clickedSignUp(legacyCampaignId);
    trackEvent('signup', {
      template,
      legacyCampaignId,
      source,
      sourceData: { text: buttonText },
    });
  };

  const baseCopy = text || campaignActionText;

  // If no source-specific override, don't opt in to the A/B test.
  const sourceOverride = get(sourceActionText, trafficSource);
  if (! sourceOverride) {
    return <Button className={className} onClick={() => onSignup(baseCopy)} text={baseCopy} />;
  }

  // A/B Test: If a user has a traffic source w/ an override, try it!
  const experiment = 'source_signup_button';
  const sourceCopy = text || sourceOverride || campaignActionText;

  return (
    <ExperimentContainer name={experiment}>
      <Button
        experiment={experiment}
        alternative="default_signup_copy"
        className={className}
        onClick={() => onSignup(baseCopy)}
        text={baseCopy}
      />
      <Button
        experiment={experiment}
        alternative="source_signup_copy"
        className={className}
        onClick={() => onSignup(sourceCopy)}
        text={sourceCopy}
      />
    </ExperimentContainer>
  );
};

SignupButton.propTypes = {
  text: PropTypes.string,
  campaignActionText: PropTypes.string,
  sourceActionText: PropTypes.objectOf(PropTypes.string),
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
