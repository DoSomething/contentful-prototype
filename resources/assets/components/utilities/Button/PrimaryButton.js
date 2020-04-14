import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonLink from './ButtonLink';
import ButtonElement from './ButtonElement';

const PrimaryButton = props => {
  const { className, isDisabled, href, onClick, text } = props;

  const classes = classnames(
    'bg-blurple-500 active:bg-blurple-700 focus:bg-blurple-300 hover:bg-blurple-300',
    'border-2 border-solid border-blurple-500 focus:border-white hover:border-blurple-300',
    'focus:outline-2 focus:outline-blurple-300 focus:outline-solid',
    'text-white hover:text-white',
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

PrimaryButton.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

PrimaryButton.defaultProps = {
  className: null,
  isDisabled: false,
  href: null,
  onClick: null,
};

export default PrimaryButton;
