import React from 'react';
import PropTypes from 'prop-types';

import SignupButtonContainer from '../SignupButton/SignupButtonContainer';
import Button from '../utilities/Button/Button';

import './revealer.scss';

const Revealer = props => {
  const { callToAction, isLoading, isSignedUp, onReveal, title } = props;

  return (
    <div className="revealer">
      {callToAction ? <h1>{callToAction}</h1> : null}
      {isSignedUp ? (
        <Button loading={isLoading} onClick={onReveal}>
          {title}
        </Button>
      ) : (
        <SignupButtonContainer className="is-cta" />
      )}
    </div>
  );
};

Revealer.propTypes = {
  callToAction: PropTypes.string,
  isLoading: PropTypes.bool,
  isSignedUp: PropTypes.bool,
  onReveal: PropTypes.func,
  title: PropTypes.string,
};

Revealer.defaultProps = {
  callToAction: null,
  isLoading: false,
  isSignedUp: false,
  onReveal: () => {},
  title: 'view more',
};

export default Revealer;
