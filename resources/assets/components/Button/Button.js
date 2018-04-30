import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './button.scss';

const Button = ({ onClick, className, attached, isLoading, children }) => {
  const classNames = classnames(
    'button',
    {
      'is-loading': isLoading,
      '-attached': attached,
    },
    className,
  );

  const buttonText = Array.isArray(children) ? children.join('') : children;
  const button = (
    <button className={classNames} disabled={isLoading} onClick={onClick}>
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
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  attached: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

Button.defaultProps = {
  className: null,
  isLoading: false,
  attached: false,
};

export default Button;
