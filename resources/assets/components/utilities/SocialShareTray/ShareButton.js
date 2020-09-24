import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ShareButton = ({
  className,
  onClick,
  disabled,
  icon,
  text,
  dataShareUrl,
}) => (
  <button
    type="button"
    className={classnames('btn share-button m-2', className)}
    onClick={onClick}
    disabled={disabled}
    data-share-url={dataShareUrl}
  >
    <img width="25" height="25" src={icon} alt="share icon" />
  </button>
);

ShareButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  dataShareUrl: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
};

ShareButton.defaultProps = {
  className: null,
  onClick: () => {},
  disabled: false,
  dataShareUrl: '',
};

export default ShareButton;
