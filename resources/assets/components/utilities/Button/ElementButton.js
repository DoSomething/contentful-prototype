/* eslint-disable react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Basic button element (<button>) with minimal styles.
 * Pass classes to style pseudo states like :hover, :focus and :active, etc.
 *
 * @param {Object} props
 */
const ElementButton = ({
  attributes,
  className,
  isDisabled,
  isLoading,
  onClick,
  text,
  type,
}) => {
  return (
    <button
      className={classnames('btn', className, { 'is-loading': isLoading })}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      {...attributes}
    >
      {text}
    </button>
  );
};

ElementButton.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

ElementButton.defaultProps = {
  attributes: {},
  className: null,
  isDisabled: false,
  isLoading: false,
  onClick: null,
  type: 'button',
};

export default ElementButton;
