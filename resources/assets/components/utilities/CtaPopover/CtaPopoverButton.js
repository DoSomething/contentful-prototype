import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button/Button.js';

const button = ({ handleClick, buttonText, link }) => {
  const handleClick = () => {};

  return (
    <button className="cta-popover__button" type="submit">
      Sign Up
      <a
        className="cta-popover__button button p-4 mt-4"
        href={link}
        onClick={handleClick}
      >
        {buttonText}
      </a>
      <Button></Button>
    </button>
  );
};

button.PropTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default button;
