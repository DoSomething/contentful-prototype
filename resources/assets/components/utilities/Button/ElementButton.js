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
  displayCaratToggle,
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
      {displayCaratToggle ? (
        <MenuCarat color={caratColor} cssStyles={caratToggle} />
      ) : null}
    </button>
  );
};

ElementButton.propTypes = {
  attributes: PropTypes.object,
  caratColor: PropTypes.string,
  caratToggle: PropTypes.object,
  className: PropTypes.string,
  displayCaratToggle: PropTypes.bool,
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
  displayCaratToggle: false,
  isDisabled: false,
  isLoading: false,
  onClick: null,
  type: 'button',
};

export default ElementButton;
