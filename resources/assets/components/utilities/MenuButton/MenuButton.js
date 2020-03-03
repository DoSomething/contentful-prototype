import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';

import MenuCarat from '../../artifacts/MenuCarat/MenuCarat';

const MenuButton = ({
  className,
  hideCarat,
  onClick,
  titleColor,
  title,
  toggleCarat,
}) => (
  <button
    onClick={() => onClick(title)}
    type="button"
    className={classnames(
      'flex items-center px-2 py-2 border-solid border border-black-600 rounded-lg focus:outline-none',
      className,
    )}
  >
    <p className={classnames('font-bold', titleColor)}>{title}</p>
    {!hideCarat ? (
      <div className="pl-2">
        <MenuCarat
          cssStyles={
            toggleCarat
              ? css`
                  transform: rotate(180deg);
                  pl-2
                `
              : null
          }
        />
      </div>
    ) : null}
  </button>
);

MenuButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  hideCarat: PropTypes.bool,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  toggleCarat: PropTypes.bool,
};

MenuButton.defaultProps = {
  className: null,
  hideCarat: false,
  titleColor: null,
  toggleCarat: false,
};

export default MenuButton;
