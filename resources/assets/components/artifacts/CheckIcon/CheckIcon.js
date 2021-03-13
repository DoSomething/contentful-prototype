import React from 'react';
import PropTypes from 'prop-types';

const CheckIcon = ({ className, color, height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 20"
    className={className}
    style={{ height: `${height}`, pointerEvents: 'none', width: `${width}` }}
  >
    <path
      d="M11.177 18.617c-1.255 0-8.051-5.625-9.411-7.048-1.36-1.423-.618-2.187 0-2.796.617-.608 1.426-1.396 2.838 0 1.413 1.397 5.028 4.321 5.924 4.321.897 0 9.535-10.015 10.923-11.39 1.388-1.373 2.47-.38 2.83 0 .358.382 1.422 1.464 0 2.87-1.423 1.407-11.85 14.043-13.104 14.043z"
      fill={color}
      stroke={color}
      fillRule="evenodd"
    />
  </svg>
);

CheckIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

CheckIcon.defaultProps = {
  className: null,
  color: '#000',
  height: 'auto',
  width: 'auto',
};

export default CheckIcon;
