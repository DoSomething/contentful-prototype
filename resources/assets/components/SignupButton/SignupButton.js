import React from 'react';
import PropTypes from 'prop-types';
import { PuckConnector } from 'puck-client';
import SignupButtonContainer from './SignupButtonContainer';

const SignupButtonFactory = (WrappedComponent, source) => {
  class SignupButton extends React.Component {
    render() {
      const { clickedSignUp, trackEvent } = this.props;

      const onSignup = (campaignId) => {
        clickedSignUp(campaignId);
        trackEvent('signup', { source, campaignId });
      };

      return (
        <WrappedComponent {...this.props} clickedSignUp={onSignup} />
      );
    }
  }

  SignupButton.propTypes = {
    clickedSignUp: PropTypes.func.isRequired,
    trackEvent: PropTypes.func.isRequired,
  };

  return SignupButtonContainer(PuckConnector(SignupButton));
}

export default SignupButtonFactory;
