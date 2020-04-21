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
    className,
    data,
    href,
    isActive,
    isDisabled,
    onClick,
    text,
    type,
  } = props;

  const activeClasses = isActive
    ? classnames('bg-gray-200 border-blurple-700 text-blurple-700')
    : classnames('');

  const classes = classnames(
    'bg-white active:bg-gray-200',
    'border-2 border-solid border-blurple-500 active:border-blurple-700 focus:rounded-none hover:border-blurple-300',
    'focus:outline-2 focus:outline-blurple-100 focus:outline-solid',
    'text-base',
    'text-blurple-500 active:text-blurple-700 hover:text-blurple-300',
    activeClasses,
    className,
  );

  if (href) {
    return (
      <LinkButton className={classes} data={data} href={href} text={text} />
    );
  }

  return (
    <ElementButton
      className={classes}
      data={data}
      isDisabled={isDisabled}
      onClick={onClick}
      text={text}
      type={type}
    />
  );
};

SecondaryButton.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

SecondaryButton.defaultProps = {
  className: null,
  data: {},
  href: null,
  isActive: false,
  isDisabled: false,
  onClick: null,
  type: 'button',
};

export default SecondaryButton;
