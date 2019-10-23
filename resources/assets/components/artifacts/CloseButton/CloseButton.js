import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CloseButton = ({ callback, className, color, size }) => (
  <button
    type="button"
    className={classnames('cursor-pointer', className)}
    onClick={callback}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{
        display: 'block',
        width: `${size}`,
        height: `${size}`,
        pointerEvents: 'none',
      }}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M17.24 0L20 2.76 12.76 10 20 17.24 17.24 20 10 12.76 2.76 20 0 17.24 7.24 10 0 2.76 2.76 0 10 7.24 17.24 0z"
      />
    </svg>
  </button>
);

export default CloseButton;

CloseButton.propTypes = {
  callback: PropTypes.func.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
};

CloseButton.defaultProps = {
  className: null,
  color: '#222',
  size: '18px',
};
