import React from 'react';
import classnames from 'classnames';

import './share.scss';

const Share = ({ variant, quote, clickedShare }) => {
  const className = classnames('button share', {'-black': variant === 'black'});

  return (
    <a className={className} onClick={() => clickedShare(quote)}>
      share on
      <i className="social-icon -facebook"><span>Facebook</span></i>
    </a>
  );
};

Share.defaultProps = {
  variant: 'black',
  quote: '',
  clickedShare: () => {},
}

export default Share;
