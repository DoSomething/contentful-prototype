import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LinkButton from './LinkButton';
import ElementButton from './ElementButton';

/**
 * Secondary style element or link button.
 *
 * Secondary buttons have a white background with a blurple colored border and text,
 * along with associated pseudo state styles.
 *
 * @param {Object} props
 */
const SecondaryButton = props => {
  const { className, href, isDisabled, onClick, text, type } = props;

  const classes = classnames(
    'bg-white focus:bg-gray-300',
    'border-2 border-solid border-blurple-500 active:border-blurple-700 focus:border-white hover:border-blurple-300',
    'focus:outline-2 focus:outline-blurple-300 focus:outline-solid',
    'text-base',
    'text-blurple-500 active:text-blurple-700 focus:text-blurple-300 hover:text-blurple-300',
    className,
  );

  if (href) {
    return <LinkButton className={classes} href={href} text={text} />;
  }

  return (
    <ElementButton
      className={classes}
      isDisabled={isDisabled}
      onClick={onClick}
      text={text}
      type={type}
    />
  );
};

SecondaryButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

SecondaryButton.defaultProps = {
  className: null,
  href: null,
  isDisabled: false,
  onClick: null,
  type: 'button',
};

export default SecondaryButton;
