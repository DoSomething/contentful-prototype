/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { mergeMetadata } from '../../helpers/analytics';

import './share.scss';

const Share = ({ variant, clickedShare, parentSource, link }) => {
  const className = classnames('button share', { '-black': variant === 'black', '-icon': variant === 'icon' });

  const metadata = mergeMetadata(Share.defaultMetadata, {
    parentSource,
    variant,
  });

  return (
    <button className={className} onClick={() => clickedShare(link, metadata)}>
      {variant === 'icon' ? null : 'share on'}
      <i className="social-icon -facebook"><span>Facebook</span></i>
    </button>
  );
};

Share.propTypes = {
  clickedShare: PropTypes.func,
  parentSource: PropTypes.string,
  variant: PropTypes.oneOf(['black', 'blue', 'icon']),
  link: PropTypes.string,
};

Share.defaultProps = {
  variant: 'black',
  clickedShare: () => {},
  parentSource: null,
  link: window.location.href,
};

Share.defaultMetadata = {
  source: 'share button',
  platform: 'facebook',
};

export default Share;
