import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { modifiers } from '../../helpers/display';

import './flex.scss';

export const Flex = ({ id, className = null, children }) => (
  <div id={id} className={classnames('md:flex md:flex-wrap', className)}>
    {children}
  </div>
);

Flex.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

Flex.defaultProps = {
  id: null,
  className: null,
};

export const FlexCell = ({ className = null, width = [], children }) => (
  <div className={classnames('flex__cell', className, modifiers(width))}>
    {children}
  </div>
);

FlexCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOf(['full', 'half', 'one-third', 'two-thirds']),
};

FlexCell.defaultProps = {
  className: null,
  width: null,
};
