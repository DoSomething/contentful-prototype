import React from 'react';
import PropTypes from 'prop-types';

const CheckIcon = ({ className, color, height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 20"
    className={className}
    style={{ height: `${height}`, pointerEvents: 'none', width: `${width}` }}
  >
    <path
      d="M21.1 1.35l-.471.5-1.651 1.812-2.921 3.234-1.152 1.26-1.22 1.31-1.07 1.123-.887.906-.472.466-.364.346-.196.173-.092.073c-.038.027-.063.041-.076.041-.14 0-.442-.147-.841-.395l-.317-.203-.348-.237-.373-.265-.393-.289-.406-.308-.415-.323-.416-.334-.412-.34-.402-.341-.387-.338-.366-.33-.339-.32-.157-.153C3.612 7.09 2.67 7.235 1.54 8.296l-.261.256C.26 9.585.139 10.59 1.404 11.914l.138.142.308.304.17.163.368.342.403.362.659.574.711.6.75.612.771.612.52.403.518.393.514.381.503.365.489.345.238.163.459.308.433.279.206.127.388.228c.554.315.986.5 1.227.5a.714.714 0 00.243-.05l.145-.064.161-.089.087-.054.186-.128a5.65 5.65 0 00.1-.073l.211-.168.23-.194.247-.22.267-.248.285-.275.465-.464.335-.344.54-.568.588-.633.86-.944.951-1.06 1.044-1.18 6.1-6.982.41-.449c1.12-1.108 1.09-2.213.352-3.178l-.116-.144-.133-.149-.09-.097c-.97-1.031-2.201-1.344-3.546-.013z"
      fill={color}
      fillRule="nonzero"
    />
  </svg>
);

CheckIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

CheckIcon.defaultProps = {
  className: null,
  color: '#000',
  height: 'auto',
  width: 'auto',
};

export default CheckIcon;
