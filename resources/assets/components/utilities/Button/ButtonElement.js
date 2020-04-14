import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ButtonElement = ({ className, isDisabled, onClick, text }) => (
  <button
    className={classnames('btn', className)}
    disabled={isDisabled}
    onClick={onClick}
  >
    {text}
  </button>
);

ButtonElement.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

ButtonElement.defaultProps = {
  className: null,
  isDisabled: false,
  onClick: null,
};

export default ButtonElement;
