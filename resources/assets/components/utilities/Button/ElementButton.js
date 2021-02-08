/* eslint-disable react/button-has-type */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MenuCarat from '../../artifacts/MenuCarat/MenuCarat';

/**
 * Basic button element (<button>) with minimal styles.
 * Pass classes to style pseudo states like :hover, :focus and :active, etc.
 *
 * @param {Object} props
 */
const ElementButton = ({
  attributes,
  caratColor,
  caratToggle,
  className,
  decoration,
  isDisabled,
  isLoading,
  onClick,
  text,
  type,
}) => {
  return (
    <button
      className={classnames('btn flex', className, {
        'is-loading': isLoading,
      })}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      type={type}
      {...attributes}
    >
      {text}
      {decoration}
    </button>
  );
};

ElementButton.propTypes = {
  attributes: PropTypes.object,
  caratColor: PropTypes.string,
  caratToggle: PropTypes.string,
  className: PropTypes.string,
  decoration: PropTypes.object,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

ElementButton.defaultProps = {
  attributes: {},
  caratColor: '#202020',
  caratToggle: null,
  className: null,
  decoration: null,
  isDisabled: false,
  isLoading: false,
  onClick: null,
  type: 'button',
};

export default ElementButton;
