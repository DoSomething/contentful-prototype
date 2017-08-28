import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './button.scss';

const Button = ({ onClick, className, text }) => (
  <button className={classnames('button', className)} onClick={onClick}>{text}</button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
};

Button.defaultProps = {
  className: null,
  text: 'Join Us',
};

export default Button;
