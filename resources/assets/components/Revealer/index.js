import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './revealer.scss';

const Revealer = (props) => {
  const { callToAction, isLoading, isVisible,
    isSignedUp, onReveal, title } = props;

  if (! isVisible) {
    return null;
  }

  return (
    <div className="revealer">
      { callToAction ? <h1>{callToAction}</h1> : null }
      <button disabled={isLoading} className={classnames('button', { 'is-loading': isLoading, 'is-cta': ! isSignedUp })} onClick={onReveal}>{title}</button>
    </div>
  );
};

Revealer.propTypes = {
  callToAction: PropTypes.string,
  isLoading: PropTypes.bool,
  isVisible: PropTypes.bool,
  isSignedUp: PropTypes.bool,
  onReveal: PropTypes.func,
  title: PropTypes.string,
};

Revealer.defaultProps = {
  callToAction: null,
  isLoading: false,
  isVisible: true,
  isSignedUp: false,
  onReveal: () => {},
  title: 'view more',
};

export default Revealer;
