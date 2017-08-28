/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { mergeMetadata } from '../../helpers/analytics';

import './share.scss';

const Share = ({ variant, clickedShare, parentSource, link, className }) => {
  const metadata = mergeMetadata(Share.defaultMetadata, {
    parentSource,
    variant,
  });

  return (
    <button
      className={classnames('button share', className, { '-black': variant === 'black', '-icon': variant === 'icon' })}
      onClick={() => clickedShare(link, metadata)}
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

Share.defaultMetadata = {
  source: 'share button',
  platform: 'facebook',
};

export default Share;
