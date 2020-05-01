import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ElementButton from './ElementButton';

const ToggleButton = props => {
  const {
    attributes,
    activateText,
    className,
    deactivateText,
    isDisabled,
    isLoading,
    isToggled,
    onClick,
    type,
  } = props;

  const activateClasses = classnames(
    'bg-blurple-500 active:bg-blurple-700 focus:bg-blurple-400 hover:bg-blurple-400',
    'border-2 border-solid border-blurple-500 active:border-blurple-700 focus:border-blurple-400 hover:border-blurple-400 focus:rounded-none',
    'focus:outline-2 focus:outline-blurple-100 focus:outline-solid',
    'text-base text-white hover:text-white',
    className,
    { 'is-loading': isLoading },
  );

  const deactivateClasses = classnames(
    'bg-white active:bg-gray-200',
    'border-2 border-blurple-500 active:border-blurple-700 hover:border-blurple-300 border-solid focus:rounded-none',
    'focus:outline-2 focus:outline-blurple-100 focus:outline-solid',
    'text-base text-blurple-500 active:text-blurple-700 hover:text-blurple-300',
    className,
    { 'is-loading': isLoading },
  );

  return (
    <ElementButton
      attributes={attributes}
      className={isToggled ? deactivateClasses : activateClasses}
      isDisabled={isDisabled}
      onClick={onClick}
      text={isToggled ? deactivateText : activateText}
      type={type}
    />
  );
};

ToggleButton.propTypes = {
  activateText: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  className: PropTypes.string,
  deactivateText: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isToggled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

ToggleButton.defaultProps = {
  attributes: {},
  className: null,
  isDisabled: false,
  isLoading: false,
  isToggled: false,
  onClick: null,
  type: 'button',
};

export default ToggleButton;
