import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import requiredIf from 'react-required-if';

import './button.scss';

const Button = ({
  onClick,
  className,
  type,
  attached,
  isDisabled,
  isLoading,
  children,
}) => {
  const classNames = classnames(
    'button',
    {
      'is-loading': isLoading,
      'is-disabled': isDisabled,
      '-attached': attached,
    },
    className,
  );

  const buttonText = Array.isArray(children) ? children.join('') : children;
  const button = (
    <button
      type={type}
      className={classNames}
      disabled={isDisabled || isLoading}
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
  type: PropTypes.string,
  onClick: requiredIf(PropTypes.func, props => props.type !== 'submit'),
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  attached: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

Button.defaultProps = {
  type: null,
  className: null,
  isDisabled: false,
  isLoading: false,
  attached: false,
};

export default Button;
