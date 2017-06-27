import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import './revealer.scss';

const Revealer = (props) => {
  if (! props.isVisible) {
    return null;
  }

  return (
    <div className="revealer">
      { props.callToAction ? <h1>{props.callToAction}</h1> : null }
      <button disabled={props.isLoading} className={classnames('button', { 'is-loading': props.isLoading, 'is-cta': ! props.isAuthenticated })} onClick={props.onReveal}>{props.title}</button>
    </div>
  );
};

Revealer.propTypes = {
  callToAction: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isVisible: PropTypes.bool,
  onReveal: PropTypes.func,
  title: PropTypes.string,
};

Revealer.defaultProps = {
  callToAction: null,
  isAuthenticated: false,
  isLoading: false,
  isVisible: true,
  onReveal: () => {},
  title: 'view more',
};

export default Revealer;
