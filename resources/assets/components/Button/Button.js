import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './button.scss';

const Button = ({ onClick, className, isLoading, text }) => {
  const classNames = classnames('button', { 'is-loading': isLoading }, className);

  return <button className={classNames} disabled={isLoading} onClick={onClick}>{text}</button>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
};

Button.defaultProps = {
  className: null,
  isLoading: false,
  text: 'Join Us',
};

export default Button;
