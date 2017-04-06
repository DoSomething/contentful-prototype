import React from 'react';
import classnames from 'classnames';
import { mergeMetadata } from '../../helpers/analytics';

import './share.scss';

const Share = ({ variant, clickedShare, parentSource }) => {
  const className = classnames('button share', {'-black': variant === 'black'});

  const metadata = mergeMetadata(Share.defaultMetadata, {
    parentSource,
    variant,
  });

  return (
    <a className={className} onClick={() => clickedShare(metadata)}>
      share on
      <i className="social-icon -facebook"><span>Facebook</span></i>
    </a>
  );
};

Share.defaultProps = {
  variant: 'black',
  clickedShare: () => {},
  parentSource: null,
}

Share.defaultMetadata = {
  source: 'share button',
  platform: 'facebook',
}

export default Share;
