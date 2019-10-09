import React from 'react';
import classnames from 'classnames';

const CloseButton = ({ callback, className }) => (
  <button
    type="button"
    className={classnames(
      'btn bg-gray-300 cursor-pointer leading-none block w-8 h-8',
      className,
    )}
    onClick={callback}
  >
    &times;
  </button>
);

export default CloseButton;
