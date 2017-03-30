import React from 'react';
import classnames from 'classnames';

import './share.scss';

const Share = ({ variant, clickedShare }) => {
  const className = classnames('button share', {'-black': variant === 'black'});

  return (
    <a className={className} onClick={clickedShare}>
      share on
      <a className="social-icon -facebook"><span>Facebook</span></a>
    </a>
  );
};

Share.defaultProps = {
  variant: 'black',
}

export default Share;
