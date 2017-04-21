import React from 'react';
import classnames from 'classnames';
import { modifiers } from '../../helpers';
import './flex.scss';

export const Flex = ({ className = null, children }) => (
  <div className={classnames('flex', className)}>
    {children}
  </div>
);

Flex.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]).isRequired,
};

Flex.defaultProps = {
  className: null,
};

export const FlexCell = ({ width = [], children }) => (
  <div className={classnames('flex__cell', modifiers(width))}>
    {children}
  </div>
);

FlexCell.propTypes = {
  width: React.PropTypes.oneOf(['full', 'one-third', 'two-thirds']),
  children: React.PropTypes.node.isRequired,
};

FlexCell.defaultProps = {
  width: [],
};
