import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
import badgeImages from './BadgeImages';

const Badge = props => {
  const {
    name,
    text,
    earned,
    boldText,
    explainerText,
    size,
    className,
  } = props;
  const badgeImageIndex = earned ? name : `${name}Locked`;

  return (
    <Figure
      image={badgeImages[badgeImageIndex]}
      alt={text}
      size={size}
      className={className}
    >
      <p>{boldText ? <strong>{text}</strong> : text}</p>
      <p>{explainerText}</p>
    </Figure>
  );
};

Badge.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  boldText: PropTypes.bool,
  explainerText: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

Badge.defaultProps = {
  boldText: false,
  explainerText: null,
  size: null,
  className: null,
};

export default Badge;
