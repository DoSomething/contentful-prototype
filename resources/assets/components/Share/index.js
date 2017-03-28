import React from 'react';
import classnames from 'classnames';

import './share.scss';

const Share = ({ variant, clickedShare }) => {
  const className = classnames('button share', {'-blue': variant === 'blue'});

  return (
    <a className={className} onClick={clickedShare}>share</a>
  );
};

Share.defaultProps = {
  variant: 'white',
}

export default Share;
