import React from 'react';
import PropTypes from 'prop-types';

import checkIcon from './check_icon.svg';

const CheckIcon = ({ className }) => (
  <img
    alt="check mark icon"
    className={className}
    src={checkIcon}
    style={{ pointerEvents: 'none' }}
  />
);

CheckIcon.propTypes = {
  className: PropTypes.string,
};

CheckIcon.defaultProps = {
  className: null,
};

export default CheckIcon;
