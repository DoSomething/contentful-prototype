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
  const {
    attributes,
    className,
    href,
    isActive,
    isDisabled,
    onClick,
    text,
    type,
  } = props;

  const baseClasses = !isActive
    ? classnames('bg-white border-blurple-500 text-blurple-500')
    : classnames('bg-gray-200 border-blurple-700 text-blurple-700');

  const classes = classnames(
    baseClasses,
    'active:bg-gray-200',
    'border-2 active:border-blurple-700 hover:border-blurple-300 border-solid focus:rounded-none',
    'focus:outline-2 focus:outline-blurple-100 focus:outline-solid',
    'text-base active:text-blurple-700 hover:text-blurple-300',
    className,
  );

  if (href) {
    return (
      <LinkButton
        attributes={attributes}
        className={classes}
        href={href}
        onClick={onClick}
        text={text}
      />
    );
  }

  return (
    <ElementButton
      attributes={attributes}
      className={classes}
      isDisabled={isDisabled}
      onClick={onClick}
      text={text}
      type={type}
    />
  );
};

SecondaryButton.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

SecondaryButton.defaultProps = {
  attributes: {},
  className: null,
  href: null,
  isActive: false,
  isDisabled: false,
  onClick: null,
  type: 'button',
};

export default SecondaryButton;
