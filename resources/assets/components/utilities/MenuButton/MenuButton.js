import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';

import MenuCarat from '../../artifacts/MenuCarat/MenuCarat';

const MenuButton = ({ className, hideCarat, onClick, title, toggleCarat }) => (
  <button
    onClick={() => onClick(title)}
    type="button"
    id={title}
    className={classnames(
      'px-2 py-2 border-solid border border-black-600 shadow-none focus:shadow-none focus:bg-blurple-500 focus:text-white focus:outline-none rounded-lg btn',
      className,
    )}
  >
    {title}
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
  toggleCarat: PropTypes.bool,
};

MenuButton.defaultProps = {
  className: null,
  hideCarat: false,
  toggleCarat: false,
};

export default MenuButton;
