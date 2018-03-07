import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { convertOnSignupIntent } from '../../helpers/sixpack';

const SignupButton = (props) => {
  const { actionText, className, clickedSignUp, experiments, template,
    source, trackEvent, legacyCampaignId, convertExperiment } = props;

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
      sourceData: { text: actionText },
    });
  };

  return (
    <button className={classnames('button', className)} onClick={onSignup}>{ actionText }</button>
  );
};

SignupButton.propTypes = {
  actionText: PropTypes.string,
  className: PropTypes.string,
  clickedSignUp: PropTypes.func.isRequired,
  convertExperiment: PropTypes.func.isRequired,
  experiments: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  legacyCampaignId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  template: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
};

SignupButton.defaultProps = {
  actionText: 'Take Action',
  className: null,
  template: null,
};

export default SignupButton;
