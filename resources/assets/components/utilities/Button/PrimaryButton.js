import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LinkButton from './LinkButton';
import ElementButton from './ElementButton';

/**
 * Primary style element or link button.
 *
 * Primary buttons have a blurple background and border with white text,
 * along with associated pseudo state styles.
 *
 * @param {Object} props
 */
const PrimaryButton = props => {
  const {
    attributes,
    className,
    href,
    isActive,
    isDisabled,
    isLoading,
    onClick,
    text,
    type,
  } = props;

  const baseClasses = !isActive
    ? classnames('bg-blurple-500 border-blurple-500')
    : classnames('bg-blurple-700 border-blurple-700');

  const classes = classnames(
    baseClasses,
    'active:bg-blurple-700 focus:bg-blurple-400 hover:bg-blurple-400',
    'border-2 border-solid active:border-blurple-700 focus:border-blurple-400 hover:border-blurple-400 focus:rounded-none',
    'focus:outline-2 focus:outline-blurple-100 focus:outline-solid',
    'text-base text-white hover:text-white',
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
      isLoading={isLoading}
      onClick={onClick}
      text={text}
      type={type}
    />
  );
};

PrimaryButton.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

PrimaryButton.defaultProps = {
  attributes: {},
  className: null,
  href: null,
  isActive: false,
  isDisabled: false,
  isLoading: false,
  onClick: null,
  type: 'button',
};

export default PrimaryButton;
