import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
import badgeImages from './BadgeImages';

const Badge = props => {
  const { name, text, earned, boldText } = props;
  const badgeImageIndex = earned ? name : `${name}Locked`;

  return (
    <div>
      <Figure image={badgeImages[badgeImageIndex]} alt={text}>
        {boldText ? <strong>{text}</strong> : text}
      </Figure>
    </div>
  );
};

Badge.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  boldText: PropTypes.bool,
};

Badge.defaultProps = {
  boldText: false,
};

export default Badge;
