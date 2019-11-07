import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button/Button.js';

const button = ({ handleClick, buttonText, link }) => {
  const handleClick = () => {};

  return;
};

button.PropTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default button;
