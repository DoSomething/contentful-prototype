import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../Button/button.scss';
import './buttonlink.scss';

const ButtonLink = ({
  link,
  className,
  onClick,
  attached,
  targetBlank,
  children,
}) => {
  const classNames = classnames(
    'button',
    {
      '-attached': attached,
    },
    className,
  );
  const buttonText = Array.isArray(children) ? children.join('') : children;
  const buttonLink = (
    <a
      href={link}
      className={classNames}
      onClick={onClick}
      target={targetBlank ? '_blank' : '_self'}
      rel={targetBlank ? 'noopener noreferrer' : null}
    >
      {buttonText}
    </a>
  );

  if (attached) {
    return <div className="button__attached-container">{buttonLink}</div>;
  }

  return buttonLink;
};

ButtonLink.propTypes = {
  link: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  attached: PropTypes.bool,
  targetBlank: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

ButtonLink.defaultProps = {
  className: null,
  onClick: () => {},
  attached: false,
  targetBlank: false,
};

export default ButtonLink;
