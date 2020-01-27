/** @jsx jsx */

import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

const MenuCarat = ({ color, cssStyles, height, width }) => (
  <div className="menu-carat">
    <svg
      css={css`
        pointerevents: 'none';
        height: ${height};
        width: ${width};
        ${cssStyles};
      `}
      // adding the props here gives us the ability to pass another
      // css prop to the component if there are one off cases we need to define
      viewBox="0 0 16 9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0665 7.3067C9.3595 8.063 8.875 8.5777 8 8.5777c-.8987 0-1.4508-.571-2.1443-1.3486L.3027 1.6747l-.0363-.0362-.0575-.0598C.0792 1.4097 0 1.1994 0 .9706 0 .4346.4345 0 .9706 0c.2549 0 .4869.0983.66.259L1.631.2588 6.781 5.408l.0145-.0048.3965.4168.808.8074L14.369.2588A.969.969 0 0115.0295 0c.536 0 .9706.4345.9706.9706 0 .2288-.0792.4392-.2089.608l-.0575.06zM8 6.628l-.019.019.019.0195.02-.0185-.02-.02z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  </div>
);

MenuCarat.propTypes = {
  color: PropTypes.string,
  cssStyles: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

MenuCarat.defaultProps = {
  color: '#202020',
  cssStyles: null,
  width: '16px',
  height: '9px',
};

export default MenuCarat;
