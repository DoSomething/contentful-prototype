import React from 'react';
import PropTypes from 'prop-types';

import badgeImages from './BadgeImages';
import { BaseFigure } from '../../utilities/Figure/Figure';

const Badge = props => {
  const { name, earned, size, className, children, showLock } = props;
  const badgeImageIndex = earned ? name : `${name}Locked`;

  const media = (
    <div style={{ position: 'relative' }}>
      <img src={badgeImages[badgeImageIndex]} alt={name} />
      {showLock && !earned ? (
        <img
          className="position-center-x"
          style={{ width: '48px', bottom: '-24px' }}
          src={badgeImages.lock}
          alt="lock"
        />
      ) : null}
    </div>
  );

  return (
    <BaseFigure media={media} size={size} className={className}>
      {children}
    </BaseFigure>
  );
};

Badge.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  showLock: PropTypes.bool,
};

Badge.defaultProps = {
  size: null,
  className: null,
  children: null,
  showLock: false,
};

export default Badge;
