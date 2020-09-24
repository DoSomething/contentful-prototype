import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';

const ShareButton = ({ className, onClick, disabled, icon, dataShareUrl }) => (
  <button
    type="button"
    className={classnames('btn share-button m-2', className)}
    onClick={onClick}
    disabled={disabled}
    data-share-url={dataShareUrl}
    css={css`
      height: 65px;
      width: 55p;
      x image {
        width: 25px;
        height: 25px;
      }
    `}
  >
    <img src={icon} alt="share icon" />
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
