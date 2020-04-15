import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonLink from './ButtonLink';
import ButtonElement from './ButtonElement';

const SecondaryButton = props => {
  const { className, href, isDisabled, onClick, text } = props;

  const classes = classnames(
    'bg-white focus:bg-gray-300',
    'border-2 border-solid border-blurple-500 active:border-blurple-700 focus:border-white hover:border-blurple-300',
    'focus:outline-2 focus:outline-blurple-300 focus:outline-solid',
    'text-blurple-500 active:text-blurple-700 focus:text-blurple-300 hover:text-blurple-300',
    className,
  );

  if (href) {
    return <ButtonLink className={classes} href={href} text={text} />;
  }

  return (
    <ButtonElement
      className={classes}
      isDisabled={isDisabled}
      onClick={onClick}
      text={text}
    />
  );
};

SecondaryButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

SecondaryButton.defaultProps = {
  className: null,
  href: null,
  isDisabled: false,
  onClick: null,
};

export default SecondaryButton;
