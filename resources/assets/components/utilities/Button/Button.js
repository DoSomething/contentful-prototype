import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import requiredIf from 'react-required-if';

// =============================================================================
// @DEPRECATED
// This component is being deprecated in favor of the new series of customizable
// button components.
// =============================================================================

import './button.scss';

const Button = ({
  onClick,
  className,
  type,
  attached,
  disabled,
  loading,
  children,
}) => {
  const classNames = classnames(
    'button',
    {
      'is-loading': loading,
      'is-disabled': disabled,
      '-attached': attached,
    },
    className,
  );

  const buttonText = Array.isArray(children) ? children.join('') : children;
  const button = (
    // We'll skip this linter because we validate this in proptypes.
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );

  // If we're rendering an "attached" button, wrap it in a padded container:
  if (attached) {
    return <div className="button__attached-container">{button}</div>;
  }

  return button;
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  onClick: requiredIf(PropTypes.func, props => props.type !== 'submit'),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  attached: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

Button.defaultProps = {
  type: 'button',
  className: null,
  disabled: false,
  loading: false,
  attached: false,
};

export default Button;
