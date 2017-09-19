/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import './share.scss';

const Share = (props) => {
  // I need `parentSource` for later and don't feel like removing it.
  const {
    variant, clickedShare, parentSource, link, className, // eslint-disable-line no-unused-vars
  } = props;

  return (
    <button
      className={classnames('button share', className, { '-black': variant === 'black', '-icon': variant === 'icon' })}
      onClick={() => clickedShare(link)}
    >
      {variant === 'icon' ? null : 'share on'}
      <i className="social-icon -facebook"><span>Facebook</span></i>
    </button>
  );
};

Share.propTypes = {
  className: PropTypes.string,
  clickedShare: PropTypes.func,
  link: PropTypes.string,
  parentSource: PropTypes.string,
  variant: PropTypes.oneOf(['black', 'blue', 'icon']),
};

Share.defaultProps = {
  className: null,
  clickedShare: () => {},
  link: window.location.href,
  parentSource: null,
  variant: 'black',
};

export default Share;
