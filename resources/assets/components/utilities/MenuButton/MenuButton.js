import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const MenuButton = ({ className, onClick, title }) => (
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
  </button>
);

MenuButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

MenuButton.defaultProps = {
  className: null,
};

export default MenuButton;
