import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { mergeMetadata } from '../../helpers/analytics';

import './share.scss';

const Share = ({ variant, clickedShare, parentSource }) => {
  const className = classnames('button share', { '-black': variant === 'black' });

  const metadata = mergeMetadata(Share.defaultMetadata, {
    parentSource,
    variant,
  });

  return (
    <button className={className} onClick={() => clickedShare(metadata)}>
      share on <i className="social-icon -facebook"><span>Facebook</span></i>
    </button>
  );
};

Share.propTypes = {
  clickedShare: PropTypes.func,
  parentSource: PropTypes.string,
  variant: PropTypes.string,
};

Share.defaultProps = {
  variant: 'black',
  clickedShare: () => {},
  parentSource: null,
};

Share.defaultMetadata = {
  source: 'share button',
  platform: 'facebook',
};

export default Share;
