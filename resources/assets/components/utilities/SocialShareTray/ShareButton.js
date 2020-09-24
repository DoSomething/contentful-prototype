import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';

const ShareButton = ({
  className,
  onClick,
  disabled,
  iconAlt,
  iconSrc,
  dataShareUrl,
}) => (
  <button
    type="button"
    className={classnames('btn mr-4 my-2', className)}
    onClick={onClick}
    disabled={disabled}
    data-share-url={dataShareUrl}
    css={css`
      height: 55px;
      width: 65px;

      image {
        width: 25px;
        height: 25px;
      }
    `}
  >
    <img src={iconSrc} alt={iconAlt} />
  </button>
);

ShareButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  dataShareUrl: PropTypes.string,
  disabled: PropTypes.bool,
  iconAlt: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
};

ShareButton.defaultProps = {
  className: null,
  onClick: () => {},
  disabled: false,
  dataShareUrl: '',
};

export default ShareButton;
