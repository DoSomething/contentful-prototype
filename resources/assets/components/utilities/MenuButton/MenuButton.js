import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';

import MenuCarat from '../../artifacts/MenuCarat/MenuCarat';

const MenuButton = ({ className, onClick, title, toggleCarat }) => (
  <button
    onClick={() => onClick(title)}
    type="button"
    className={classnames(
      'flex items-center px-2 py-2 border-solid border border-black-600 rounded-lg focus:outline-none',
      className,
    )}
  >
    <p className="font-bold pr-2">{title}</p>
    <MenuCarat
      cssStyles={
        toggleCarat
          ? css`
              transform: rotate(180deg);
            `
          : null
      }
    />
  </button>
);

MenuButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleCarat: PropTypes.bool.isRequired,
};

MenuButton.defaultProps = {
  className: null,
};

export default MenuButton;
