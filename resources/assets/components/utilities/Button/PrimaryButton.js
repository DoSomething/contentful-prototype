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
  const { className, href, isDisabled, onClick, text, type } = props;

  const classes = classnames(
    'bg-blurple-500 active:bg-blurple-700 focus:bg-blurple-300 hover:bg-blurple-300',
    'border-2 border-solid border-blurple-500 focus:border-white hover:border-blurple-300',
    'focus:outline-2 focus:outline-blurple-300 focus:outline-solid',
    'text-white hover:text-white',
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

PrimaryButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

PrimaryButton.defaultProps = {
  className: null,
  href: null,
  isDisabled: false,
  onClick: null,
  type: 'button',
};

export default PrimaryButton;
