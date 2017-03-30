import React from 'react';
import classnames from 'classnames';

import './share.scss';

const Share = ({ variant, clickedShare }) => {
  const className = classnames('button share', {'-black': variant === 'black'});

  return (
    <a className={className} onClick={clickedShare}>
      share on
      <i className="social-icon -facebook"><span>Facebook</span></i>
    </a>
  );
};

Share.defaultProps = {
  variant: 'black',
  clickedShare: () => {},
}

export default Share;
