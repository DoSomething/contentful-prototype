import React from 'react';
import classNames from 'classnames';
import { modifiers } from '../../helpers';
import './wrapper.scss';

export const Wrapper = ({width = '', children}) => {
  return (
    <div className={classNames('wrapper', modifiers(width))}>
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  width: React.PropTypes.oneOf(['default', 'feed']),
};
