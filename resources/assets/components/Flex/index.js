import React from 'react';
import classNames from 'classnames';
import { modifiers } from '../../helpers';
import './flex.scss';

export const Flex = ({children}) => {
  return (
    <div className="flex">
      {children}
    </div>
  );
};

export const FlexCell = ({width = [], children}) => {
  return (
    <div className={classNames('flex__cell', modifiers(width))}>
      {children}
    </div>
  );
};

FlexCell.propTypes = {
  width: React.PropTypes.oneOf(['full', 'one-third', 'two-thirds']),
};

