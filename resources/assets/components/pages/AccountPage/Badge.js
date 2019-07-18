import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
import badgeImages from './BadgeImages';

const Badge = props => {
  const { name, earned, size, className, children } = props;
  const badgeImageIndex = earned ? name : `${name}Locked`;

  return (
    <Figure
      image={badgeImages[badgeImageIndex]}
      alt={name}
      size={size}
      className={className}
    >
      {children}
    </Figure>
  );
};

Badge.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

Badge.defaultProps = {
  size: null,
  className: null,
  children: null,
};

export default Badge;
