import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import requiredIf from 'react-required-if';

import './buttonlink.scss';

const ButtonLink = ({ link, className, attached, targetBlank, children }) => {
  const classNames = classnames(
    'buttonLink',
    {
      '-attached': attached,
    },
    className,
  );
  const buttonText = Array.isArray(children) ? children.join('') : children;
  const buttonLink = (
    <a href={link} className="button">
      {classNames}
      {buttonText}
    </a>
  );

  if (targetBlank) {
    return (
      <a
        href={link}
        className="button"
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText}
      </a>
    );
  }

  return buttonLink;
};

ButtonLink.propTypes = {
  link: PropTypes.string.isRequired,
  onClick: requiredIf(PropTypes.func, props => props.type !== 'submit'),
  className: PropTypes.string,
  attached: PropTypes.bool,
  targetBlank: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

ButtonLink.defaultProps = {
  className: null,
  attached: false,
};

export default ButtonLink;
