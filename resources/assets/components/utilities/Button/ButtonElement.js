import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Basic button element (<button>) with minimal styles.
 * Pass classes to style pseudo states like :hover, :focus and :active, etc.
 *
 * @param {Object} props
 */
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
