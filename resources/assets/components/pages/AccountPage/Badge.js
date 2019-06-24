import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
import badgeImages from './BadgeImages';

const Badge = props => {
  const { name, text, earned } = props;
  const badgeImageIndex = earned ? name : `${name}Locked`;

  return (
    <div>
      <Figure image={badgeImages[badgeImageIndex]} alt={text}>
        {text}
      </Figure>
    </div>
  );
};

Badge.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Badge;
