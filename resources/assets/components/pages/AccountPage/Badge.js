import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
import badgeImages from './BadgeImages';

const Badge = props => {
  const { name, text, earned, boldText, explainerText, size } = props;
  const badgeImageIndex = earned ? name : `${name}Locked`;

  return (
    <div>
      <Figure image={badgeImages[badgeImageIndex]} alt={text} size={size}>
        <p>{boldText ? <strong>{text}</strong> : text}</p>
        <p>{explainerText}</p>
      </Figure>
    </div>
  );
};

Badge.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  boldText: PropTypes.bool,
  explainerText: PropTypes.string,
  size: PropTypes.string,
};

Badge.defaultProps = {
  boldText: false,
  explainerText: null,
  size: null,
};

export default Badge;
