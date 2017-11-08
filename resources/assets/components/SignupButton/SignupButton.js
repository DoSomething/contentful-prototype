import React from 'react';
import PropTypes from 'prop-types';
import { PuckConnector } from '@dosomething/puck-client';
import SignupButtonContainer from './SignupButtonContainer';

/**
 * HOC for wrapping signup buttons. Handles tracking
 * and dispatching the signup action.
 *
 * @param {Component} WrappedComponent
 * @param {String} source
 * @param {Object} sourceData
 * @return {Class} <SignupButton />
 */
const SignupButtonFactory = (WrappedComponent, source = null, sourceData = null) => {
  const SignupButton = (props) => {
    const { clickedSignUp, template, trackEvent } = props;

    const onSignup = (campaignId) => {
      clickedSignUp(campaignId);
      trackEvent('signup', {
        template,
        campaignId,
        source,
        sourceData,
      });
    };

    return (
      <WrappedComponent {...props} clickedSignUp={onSignup} />
    );
  };

  SignupButton.propTypes = {
    clickedSignUp: PropTypes.func.isRequired,
    template: PropTypes.string,
    trackEvent: PropTypes.func.isRequired,
  };

  SignupButton.defaultProps = {
    template: null,
  };

  return SignupButtonContainer(PuckConnector(SignupButton));
};

export default SignupButtonFactory;
