import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ShareButton = ({ className, onClick, disabled, icon, text }) => (
  <button
    type="button"
    className={classnames('button share-button m-2', className)}
    onClick={onClick}
    disabled={disabled}
  >
    <img className="icon-image float-left" src={icon} alt="share icon" />
    <span className="button-text">{text}</span>
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
