import React from 'react';
import PropTypes from 'prop-types';

import './placeholder-text.scss';

const PlaceholderText = ({ size }) => (
  <div className={`placeholder-shimmer placeholder-text -${size}`} />
);

PlaceholderText.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
};

export default PlaceholderText;
