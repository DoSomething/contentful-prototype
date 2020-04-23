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
  className,
  data,
  isDisabled,
  onClick,
  text,
  type,
}) => {
  return (
    <button
      className={classnames('btn', className)}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      {...data}
    >
      {text}
    </button>
  );
};

ElementButton.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

ElementButton.defaultProps = {
  className: null,
  data: {},
  isDisabled: false,
  onClick: null,
  type: 'button',
};

export default ElementButton;
