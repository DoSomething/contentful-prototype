import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ShareButton = ({ className, onClick, disabled, icon, text }) => (
  <button
    className={classnames('button share-button margin-sm', className)}
    onClick={onClick}
    disabled={disabled}
  >
    <img className="icon-image float-left" src={icon} alt="share icon" />
    <span className="button-text hide-on-mobile">{text}</span>
  </button>
);

ShareButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
};

ShareButton.defaultProps = {
  className: null,
  onClick: () => {},
  disabled: false,
  text: 'Share',
};

export default ShareButton;
