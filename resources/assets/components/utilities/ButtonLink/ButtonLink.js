import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { isExternal } from '../../../helpers';

import '../Button/button.scss';

const ButtonLink = ({ link, className, onClick, attached, children }) => {
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
      target={isExternal(link) ? '_blank' : '_self'}
      rel={isExternal(link) ? 'noopener noreferrer' : null}
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
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

ButtonLink.defaultProps = {
  className: null,
  onClick: () => {},
  attached: false,
};

export default ButtonLink;
